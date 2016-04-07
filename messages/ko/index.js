let messages = require('../index');

module.exports = messages.merge({
    emailPlaceholder: `이메일 주소`,
    'index.contactless.header': `
      <h2 class="SpendIndex-contactless-h2">
        어디서나 터치 한 번으로,<br>진정한 간편결제.
      </h2>`,
    'index.contactless.paragraphs': /* Markdown */ `NFC가 아닙니다. 스펜드월렛의 자체 개발된 MST 기술은 눈 깜짝할 사이에 자기장을 발생시켜 카드리더기에 결제신호를 송출합니다. 마치 일반카드로 긁는 것과 동일한 신호를 전달하기 때문에 모든 카드리더기에서 사용할 수 있습니다. 이제 어디서나 간편하게 터치로 결제하세요.`,
    'index.physicalCards.article': /* Markdown */ `## 지갑, 그 본연의 역할에 충실한 스마트지갑.

  스펜드월렛은 당신을 더 멋있고 스마트하게 바꿔줄 진정한 전자지갑입니다. 보유하고 있는 모든 카드를 통합할 수 있고, 후면부에는 신분증, 명함 등을 담을 수 있는 포켓이  있습니다. 그 어떤 지갑보다 얇지만, 그 어떤 지갑보다 많은 신용카드를 수납할 수 있습니다.`,

    'index.heading': `당신의 모든 카드를 통합해줄<br>가장 가벼운 전자지갑, 스펜드월렛.`,
    'index.newsletter.heading': `이메일주소 등록 후 43% 할인된 가격 혹은 무료로 Spendwallet을 경험하세요.`,
    'index.newsletter.description': `1200명 한정.`,
    'index.design.heading': `견고한 재질, 심플한 디자인.`,
    'index.design.description': `단단하고 가벼운 알루미늄 소재의 프레임과 내구성이 뛰어난 플라스틱 재질로 만들어진 스펜드월렛. 일상생활 주머니 속에서도 충분한 내구성을 갖춥니다.`,
    'index.measure.heading': `가볍다. 얇다.<br /> 스펜드월렛.`,
    'index.measure.dimensions': `6.0mm / 65grams`,
    'index.measure.dimensions2': `두께: 6.0mm 크기: 60.5mm x 105mm`,
    'index.charge.heading': `진정한 전자지갑, 스펜드월렛.`,
    'index.charge.description': `당신의 모든 카드를 스펜드월렛에 저장하여 얇고 가볍게 휴대하세요. 기존의 무겁고 두꺼웠던 지갑 대신, 가볍고 스마트한 전자지갑의 시대가 열립니다.`,
    'index.tech.section.heading': `상세정보`,
    'index.tech.heading': `제품사양`,
    'index.tech.description': `기존의 무겁고 두꺼웠던 지갑 대신, 스마트한 전자지갑의 시대가 열립니다.<br />스펜드월렛은 당신의 모든 카드를 통합해줄 진정한 전자지갑입니다.`,
    'index.tech.touch.title': `정전식 터치센서`,
    'index.tech.touch.description': `터치 선택과 자동 진동 피드백`,
    'index.tech.battery.title': `간단한 충전방식`,
    'index.tech.battery.description': `4주의 배터리 사용량`,
    'index.tech.led.title': `숨겨진 LED 디스플레이`,
    'index.tech.led.description': `디자인과 자연스러운 어울림`,
    'index.security.section.heading': `보안`,
    'index.security.section.description': `당신의 금융정보를 안전하게 보관하세요.`,
    'index.security.alert.name': `위치기반 잠금기능`,
    'index.security.alert.description': `분실 시 자동 잠금\n및 데이터 소멸`,
    'index.security.passcode.name': `보안코드 인증`,
    'index.security.passcode.description': `보안코드와 스마트폰 지문인식 \n센서를 이용한 보안기능`,
    'index.security.encrypt.name': `데이터 암호화`,
    'index.security.encrypt.description': `은행 및 금융서비스 보안수준의\nAES 256비트 암호화 기술`,
    'index.application.heading': `모바일 앱`,
    'index.application.description': `스펜드 모바일앱으로 신용카드와 바코드 멤버십카드를 관리하고, 사용내역 또한 간단하게 확인하세요.`,
    'index.button.video': `Video coming soon`,
    'index.button.preorder': `Coming soon on `,
    'index.button.language': `Language: English`,

    'index.preorder.heading': `전세계 배송`,
    'index.preorder.description': `곧 예약주문이 시작됩니다.`,

    jobOpenings: require('./data/jobOpenings'),
    legalDocs: require('./data/legalDocs'),
    team: require('./data/team'),
    faqSections: require('./data/faqSections'),
    'faq.furtherAssistance': `기타 질문은?`,
    'faq.dontHesitate': `주저말고 연락주세요.`,
    'faq.title': `F<span class="visible-md-inline visible-lg-inline">requently </span>A<span class="visible-md-inline visible-lg-inline">sked </span>Q<span class="visible-md-inline visible-lg-inline">uestions</span>`,
    'faq.description': `자주 묻는 질문들`,
    'faq.emailUs': `이메일 보내기`,

    'jobs.title': `<span class="SpendLogo">spend.</span> <span class="visible-md-inline visible-lg-inline">의 가족이 되어주세요.</span>`,
    'jobs.description': ` `,
    'jobs.whatIsSpend': `<span class="SpendLogo">spend.</span>와 함께하면 어떨까요?`,
    'jobs.weAreLooking': `즐거운 도전에 함께하고 싶으신 분이라면 주저말고 연락주세요.`,
    'jobs.whatIsSpendDescription': `좋은 기술을 만들어 많은 사람들의 삶을 보다 더 가치있게 만드는 것, 그것이 우리가 존재하는 이유이자 목표입니다. 직접 만드는 서비스와 제품이 사람들의 손에서 편리함으로 변할 때 진정한 성취감을 느낍니다.`,
    'jobs.additionalPositions': `찾으시는 포지션이 없으신가요?`,
    'jobs.hearFromYou': `그래도 우리는 당신의 연락을 기다립니다. 지금 바로 이메일 주세요.`,
    'jobs.openRoles': `채용정보`,

    'team.title': `<span class="SpendLogo">spend.</span>팀을 만나보세요.`,
    'team.description': ` `,
    'team.joinTheTeam': `Join the Team`,
    'team.weAreHiring': `함께할 가족을 찾습니다.`,
    'team.viewOpenings': `채용정보 보기`,

    'menu.team': `Team`,
    'menu.jobs': `Jobs`,
    'menu.faq': `FAQ`,

    'footer.team': `Team`,
    'footer.jobs': `Jobs`,
    'footer.faq': `FAQ`,
    'footer.legal': `Legal`,
    'footer.copyrights': `2016 X Lab Inc. Newport Beach, California. All Rights Reserved.`

});
