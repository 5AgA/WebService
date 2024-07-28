package mondial;

import javax.xml.parsers.*;

import org.w3c.dom.*;

import javax.xml.transform.*;
import javax.xml.transform.dom.*;
import javax.xml.transform.stream.*;

import java.io.*;
import java.text.NumberFormat;

public class processMondial {
	static final String inputFile = "mondial/mondial.xml"; // 나중에 "mondial/mondial.xml"로 변경해서 테스트
	static final String outputFile = "mondial/result.xml";

	// 대륙별 인구 계산 및 출력을 위해 대륙 이름들을 저장한 배열 정의
	static final String continent[] = new String[] { "Africa", "America", "Asia", "Australia", "Europe" };

	static long pop[] = new long[5]; // 각 대륙의 인구 값을 저장할 배열 선언(대륙의 순서는 위 배열과 동일)

	public static void main(String[] args) throws Exception {
		// DOM 파서 생성
		DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
		factory.setIgnoringElementContentWhitespace(true);
		DocumentBuilder builder = factory.newDocumentBuilder();

		// XML 문서 파싱하기
		Document document = builder.parse(inputFile);

		Element mondial = document.getDocumentElement();

		// 대륙별 인구를 계산 및 출력 (3번)
		computePopulationsOfContinents(mondial);

		// 종교별 신자 수를 계산 및 출력 (4번)
		// computeBelieversOfReligions(mondial);

		// 국가별 정보 검색 및 출력 (1번)
		processCountries1(mondial);

		// 국가별 정보 검색 및 DOM 트리 수정 (2번)

		processCountries2(mondial);

		// 처리 결과 출력을 위한 변환기 생성
		TransformerFactory tf = TransformerFactory.newInstance();
		Transformer transformer = tf.newTransformer();

		// 출력 포맷 설정: XML 선언과 문서 유형 선언 내용 설정하기
		transformer.setOutputProperty(OutputKeys.ENCODING, "utf-8");
		transformer.setOutputProperty(OutputKeys.DOCTYPE_SYSTEM, "mondial.dtd");
		transformer.setOutputProperty(OutputKeys.INDENT, "yes");
		transformer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "2");

		// DOMSource 객체 생성
		DOMSource source = new DOMSource(document);

		// StreamResult 객체 생성
		StreamResult result = new StreamResult(new File(outputFile));

		// 파일로 저장하기
		transformer.transform(source, result);

		System.out.println();
		System.out.println(outputFile + "로 저장되었습니다.");

	}

	public static void processCountries1(Element mondial) {
		for (Node ch = mondial.getFirstChild(); ch != null; ch = ch.getNextSibling()) {

			// 국가 노드
			if (ch.getNodeName().equals("country")) {
				Element country = (Element) ch;

				// 국가 이름
				Node name = country.getFirstChild();
				String cName = name.getFirstChild().getNodeValue();
				System.out.println(cName);

				// 국가 면적
				String area = country.getAttribute("area");
				System.out.println("면적: " + area);

				// 국가 인구 수
				Node pop = country.getFirstChild().getNextSibling();
				String cPop = pop.getFirstChild().getNodeValue();
				System.out.println("인구: " + cPop);

				// 국가 수도의 이름
				NodeList cityList = country.getElementsByTagName("city");
				for (int i = 0; i < cityList.getLength(); i++) {
					Element city = (Element) cityList.item(i);
					String isCap = city.getAttribute("is_country_cap");
					if (!isCap.isEmpty() && isCap.equals("yes")) {
						Node capital = city.getFirstChild();
						String capName = capital.getFirstChild().getNodeValue();
						System.out.println("수도의 이름: " + capName + "\n");
					}
				}
			}
			continue;
		}
	}

	public static void processCountries2(Element mondial) {
		NodeList list = mondial.getElementsByTagName("country");

		for (int i = 0; i < list.getLength(); i++) {

			// 각 <country> element에 대해
			Element country = (Element) (list.item(i));
			Document document = mondial.getOwnerDocument();

			// 2-1 <code>를 생성해서 <name> 다음에 추가
			// country의 car_code 속성 값을 구함 (ex. Element#getAttribute() 이용)
			// Document 노드를 구해(getOwnerDocument() 이용),
			// <code> Element 노드와 Text 노드를 생성(createXXX() 이용)
			// Element와 Text를 부모-자식으로 연결
			// country의 두 번째 자식 노드를 구하고 그 노드 앞에 <code> 노드를 삽입(insertBefore() 이용)

			String car_code = country.getAttribute("car_code");
			Element code = document.createElement("code");
			code.appendChild(document.createTextNode(car_code));
			Node popNode = country.getElementsByTagName("name").item(0);
			country.insertBefore(code, popNode.getNextSibling());

			// 2-2 수도에 해당하는 <city> 및 그 subtree를 DOM 트리에서 찾아 미리 제거해 둠
			// country의 capital 속성 값을 구함 (capital city의 ID로 사용됨)
			// 주의: capital 속성이 없는 country도 있으므로 capital 속성 값이 empty string인지 확인
			// 필요(String#isEmpty() 이용)
			// Document#getElementById()를 이용해서 수도에 해당하는 <city>를 찾음 (주의: 존재하지 않을 수도 있음!)
			// 그 노드(및 subtree)를 DOM 트리에서 제거 (부모 노드를 구해 removeChild() 실행 -> 강의자료 참조)
			// 주의: <city>는 <province>의 자식인 경우도 있으므로 <country>를 부모 노드로 가정하고 직접 삭제하면 오류가 발생할 수
			// 있음!
			// 주의: <city> 엘리먼트만 부모에서 제거하면 <city>를 루트로 하는 서브트리가 제거됨

			String cId = country.getAttribute("capital");
			Element capitalClone = null;
			if (!cId.isEmpty()) {
				Element capital = document.getElementById(cId);
				capitalClone = (Element) capital.cloneNode(true);
				if (capital != null) {
					Element parent = (Element) capital.getParentNode();
					parent.removeChild(capital);
				}
			}

			// 2-3 <population> 이후의 형제 노드들을 모두 삭제
			// 앞에서 구한 <population> 노드의 다음 노드들을 차례대로 이동하면서
			// <country>에서 삭제 (주의: 제거하기 전에 다음 형제 노드를 먼저 구해놓아야 함! -> 강의자료 참조)

			Node population = country.getElementsByTagName("population").item(0);
			Node popParent = population.getParentNode();
			Node popSibling = population.getNextSibling();
			while (popSibling != null) {
				Node removeNode = popSibling;
				popSibling = popSibling.getNextSibling();
				popParent.removeChild(removeNode);
			}

			// 2-4 앞에서 제거해 둔 수도에 해당하는 <city>(및 그 서브트리)를 <country>의 마지막 자식으로 추가
			// <city>의 id를 제외한 모든 속성들을 삭제

			if (capitalClone != null) {
				NamedNodeMap attrs = capitalClone.getAttributes();
				for (int j = attrs.getLength() - 1; j >= 0; j--) {
					Node attr = attrs.item(j);
					if (!attr.getNodeName().equals("id"))
						capitalClone.removeAttribute(attr.getNodeName());
				}				
				country.appendChild(capitalClone);
			}


			// 2-5 <country>의 모든 속성들을 삭제

			Element country2 = (Element) list.item(i);
			NamedNodeMap cAttrs = country2.getAttributes();
			for (int j = cAttrs.getLength() - 1; j >= 0; j--) {
				Node cAttr = cAttrs.item(j);
				country2.removeAttributeNode((Attr) cAttr);
			}
		}

		// 2-6 <country> 외의 다른 노드들을 모두 삭제

		Document document = mondial.getOwnerDocument();
		NodeList nodeList = document.getDocumentElement().getChildNodes();
		for (int i = nodeList.getLength() - 1; i >= 0; i--) {
			Node node = nodeList.item(i);
			if (!node.getNodeName().equals("country"))
				document.getDocumentElement().removeChild(node);
		}
	}

	public static void computePopulationsOfContinents(Node mondial) {
        
        
        
  
		
        NodeList list = mondial.getChildNodes();
        
        // 각 <country> element에 대해
        for (int i = 0; i < list.getLength(); i++) {
            Node country = list.item(i);
            if (country.getNodeType() == Node.ELEMENT_NODE) {
                Element counElement = (Element) country;
                //String countryName = counElement.getAttribute("name");
                
                // <population> 노드로 이동(주의: <population>이 존재하지 않을 수도 있음) 
                NodeList popNodes = counElement.getElementsByTagName("population");
                if (popNodes.getLength() > 0) {
                    Element popElement = (Element)popNodes.item(0);
                    
                    // population의 값을 구해 long 타입으로 변환
                    long population = Long.parseLong(popElement.getTextContent());
                    Node sibling = popElement.getNextSibling();
                    double maxPercent = 0.0;
                    String maxContinent = null;
                    
                    // <encompassed>가 발견될 때까지(!) 다음 형제들로 이동
                    while (sibling != null) {
                        if (sibling.getNodeType() == Node.ELEMENT_NODE && sibling.getNodeName().equals("encompassed")) {
                            Element encompassed = (Element)sibling;
                            String continentName = encompassed.getAttribute("continent");
                            
                            // 이후 발견되는 <encompassed>들에 속한 percentage 속성 값들의 최대 값을 구하는 알고리즘 구현
                            //   단, 최대 값에 대응되는 continent 값을 구해야 하므로 
                            //   미리 percentage의 max 값을 저장할 변수와 percentage가 max일 때의 continent 값을 저장할 변수를
                            //   선언하고 두 변수 값을 함께 update함
                            //   percentage 값은 Double 타입으로 변환하여 저장 및 비교
                            
                            double percent = Double.parseDouble(encompassed.getAttribute("percentage"));
                            if (percent > maxPercent) {
                            	maxPercent = percent;
                            	maxContinent = continentName;
                            }
                        }
                        sibling = sibling.getNextSibling();
                    }
                    if (maxContinent != null) {
                    	// switch - case 구조를 이용해서, 위에서 구한 continent 값에 따라 
                    	// 위 22행에 선언된 pop[]의 해당 원소 값에 population 값을 누적시킴
                    	//   주의: 각 case 끝에 반드시 break 필요!
                        switch (maxContinent) {
                        case "africa":
                            pop[0] += population;
                            break;
                        case "america":
                            pop[1] += population;
                            break;
                        case "asia":
                            pop[2] += population;
                            break;
                        case "australia":
                            pop[3] += population;
                            break;
                        case "europe":
                            pop[4] += population;
                            break;
                        }
                    }
                }
            }
        }

        // 계산된 각 대륙의 인구를 출력
        printPopulationsOfContinents();
	}

	public static void printPopulationsOfContinents() {
		NumberFormat formatter = NumberFormat.getInstance();
        long sum = pop[0] + pop[1] + pop[2] + pop[3] + pop[4];
        System.out.println("Populations of the Continents");
        System.out.println("--------------------------");
        System.out.println("Europe의 인구: " + formatter.format(pop[4]));
        System.out.println("Asia의 인구: " + formatter.format(pop[2]));
        System.out.println("America의 인구: " + formatter.format(pop[1]));
        System.out.println("Africa의 인구: " + formatter.format(pop[0]));
        System.out.println("Austrailia의 인구: " + formatter.format(pop[3]));
        System.out.println("--------------------------");
        System.out.println("합계: " + formatter.format(sum) + "\n");

	}

}