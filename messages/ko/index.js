let messages = require('../index');

module.exports = messages.merge({
    emailPlaceholder: `이메일 주소`,
    'index.contactless.header': `
      <h2 class="SpendIndex-contactless-h2">
        어디서나 터치 한 번으로,<br>진정한 간편결제.
      </h2>`,
    'index.contactless.paragraphs': /* Markdown */ `NFC가 아닙니다. 스펜드월렛의 자체 개발된 MFE 기술은 모든 카드리더기와 호환 가능한 결제기술입니다. 자기장을 발생시켜 마치 일반카드로 긁는 것과 동일한 신호를 전달하기 때문에 언제 어디서나 간편하게 터치로 결제할 수 있습니다.`,
    'index.physicalCards.article': /* Markdown */ `## 디지털과 아날로그를 모두 품다.

  모든 것을 디지털화 할 필요는 없습니다. 여러분의 신분증과 교통카드는 스펜드월렛 뒷면 포켓에 담으세요.`,

    'index.heading.fat': `스펜드월렛을 소개합니다`,
    'index.heading': `모든 카드를 통합해주는<br>가장 가볍고 스마트한 지갑`,
    'index.newsletter.heading': `이메일을 등록하여 스펜드월렛에 대해 더 알아보세요.`,
    'index.newsletter.description': `관련 소식과 혜택, 업데이트를 보내드립니다.`,
    'index.design.heading': `견고한 재질, 심플한 디자인.`,
    'index.design.description': `단단하고 가벼운 알루미늄 소재의 프레임과 내구성이 뛰어난 플라스틱으로 만들어진 스펜드월렛은 일상생활에서 사용하기에 충분한 내구성을 자랑합니다.`,
    'index.measure.heading': `가볍다. 얇다.<br /> 스펜드월렛.`,
    'index.measure.dimensions': `5.8mm / 54grams`,
    'index.measure.dimensions2': `두께: 5.8mm 크기: 60.5mm x 105mm`,
    'index.charge.heading': `지갑과 기술이 만나다. 스펜드월렛.`,
    'index.charge.description': `수납과 결제, 그리고 패션. 더 이상 무거운 지갑을 들고다닐 필요 없습니다. 암호화된 카드정보만 저장하는 스펜드월렛은 몇 장의 카드를 저장하더라도 여러분의 패션을 방해하지 않습니다.`,
    'index.tech.section.heading': `상세정보`,
    'index.tech.heading': `제품사양`,
    'index.tech.description': `기존의 무겁고 두꺼웠던 지갑 대신, 스마트한 전자지갑의 시대가 열립니다.<br />스펜드월렛은 당신의 모든 카드를 통합해줄 진정한 전자지갑입니다.`,
    'index.tech.touch.title': `정전식 터치센서`,
    'index.tech.touch.description': `가벼운 터치와 자동 진동피드백`,
    'index.tech.battery.title': `간단한 충전방식`,
    'index.tech.battery.description': `4주의 배터리 사용량`,
    'index.tech.led.title': `숨겨진 LED 디스플레이`,
    'index.tech.led.description': `사용시에만 나타나는 화면`,
    'index.security.section.heading': `보안`,
    'index.security.section.description': `당신의 금융정보를 안전하게 보관하세요.`,
    'index.security.alert.name': `위치기반 잠금기능`,
    'index.security.alert.description': `제품 분실 시 자동 잠금\n및 데이터 소멸`,
    'index.security.passcode.name': `보안코드 인증`,
    'index.security.passcode.description': `보안코드와 스마트폰 지문인식을 \n활용한 안전한 보안장치`,
    'index.security.encrypt.name': `데이터 암호화`,
    'index.security.encrypt.description': `은행 및 금융서비스 수준의\nAES 256비트 암호화 기술`,
    'index.application.heading': `모바일 앱`,
    'index.application.description': `스펜드 모바일앱으로 신용카드와 바코드 멤버십카드를 관리하고, 사용내역 또한 간단하게 확인하세요.`,
    'index.button.video': `Video coming soon`,
    'index.button.preorder': `Pre-order on `,
    'index.button.language': `Language: English`,
    'index.button.scroll': `이메일 등록하기`,

    'index.preorder.heading': `전세계 배송`,
    'index.preorder.description': `2017년 8월 배송예정`,

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
    'menu.promotion': `Promotion`,

    'promotion.title': `Thank you!`,
    'promotion.description': `스펜드월렛의 선주문이 곧 시작됩니다. 가장 먼저, 얼리버드 가격으로 주문하실 수 있도록 런칭 당일 이메일을 발송해드리겠습니다.`,
    'promotion.descriptionSecond': `선주문이 시작되기 전까지 매일 1명을 추첨하여 스펜드월렛을 무료로 드리는 프로모션을 진행 중입니다. 아래의 각 미션을 수행할 때마다 1점이 추가되며, 매일 참여할 수록 당첨확률이 높아집니다. 행운을 놓치지 마세요!`,
    'promotion.callToAction': `지인분들께 초대 메일을 발송하시면, 당첨확률을 극대화할 수 있습니다.`,

    'success.title': `감사합니다!`,
    'success.description': `이메일 등록이 성공적으로 완료되었습니다 <br> 곧 발송될 이메일에서 더 많은 정보와 혜택을 받아보실 수 있습니다`,
    'success.callToAction': `홈으로 돌아가기`,

    'presskit.title': `Press Kit`,
    'presskit.description': `제품 및 회사에 대한 추가적인 사항은 pr@spendwallet.com 으로 문의 부탁드립니다.`,

    'presskit3.message.title': `보도자료`,
    'presskit3.message.date': `최종수정 2016년 5월 15일`,
    'presskit3.message': `
      <p><b>카드저장하고 결제가능한 스마트지갑, 스펜드월렛 공식 출시</b></p>
      <p><i>신용카드, 체크카드 등 최대 20장 저장가능하고, 마그네틱을 지원하는 진정한 스마트지갑 스펜드월렛, 미국 크라우드펀딩 통해 글로벌 진출 출사표.</i></p>
      <p><br>신용카드, 체크카드 등 최대 20장의 카드를 저장하고, 결제 할 수 있는 IoT스마트지갑 ‘스펜드월렛’(Spendwallet)이 글로벌 크라우드펀딩 플랫폼 ‘인디고고’(http://igg.me/at/spendwallet)에서 크라우드펀딩을 시작하였다.</p>
      <p>스펜드월렛은 최대 20장의 신용카드와 체크카드, 포인트카드 등을 저장하고, 자체개발된 자기장결제기술(MFE: Magnetic Flux Emulation)을 통해 모든 카드리더기에서 결제 할 수 있는 스마트 전자 지갑이다.</p>
      <p>스펜드월렛을 개발한 엑스엔지니어링은 생활 속에서 많이 사용되는 지갑에 사물인터넷(IoT) 기술을 적용한 하드웨어 스타트업이다. 제품을 위해 자기장 결제기술인 MFE를 자체 개발하였으며 관련 특허를 출원중이다.</p>
      <p>엑스엔지니어링 강민구 대표는 “지갑은 뚜렷한 불편함이 있었음에도 불구하고, 바뀌지 않은 몇 안되는 아이템 중 하나이다. 사물인터넷(IoT) 기술을 적용하여 기존 지갑의 불편함을 없애고, 편의성과 보안을 더했으며, 범용성 높은 결제 기능을 위해 자기장 결제기술(MFE)을 자체개발하였다. 인디고고 크라우드펀딩을 시작으로 해외시장의 반응을 볼 것이” 라고 포부를 밝혔다.</p>
      <p>스펜드월렛은 카드정보를 디지털화하여 저장하기 때문에 기존 지갑의 물리적인 제약이 없다. 때문에 최대 20장의 신용카드와 체크카드, 포인트카드등을 저장할 수 있다. 또한 마그네틱 카드리더기에서 작동가능한 자기장 결제기술(MFE)을 제품에 적용하여 대부분의 카드 결제 단말기에서 사용가능하다는 장점이 있다.</p>
      <p>인디고고를 통해 선주문되는 스펜드월렛은 가장 먼저 주문하는 슈퍼얼리버드(Super Early Bird) 75명에 한하여 39% 할인된 가격으로 제품을 제공한다. 스펜드월렛은 인디고고에서 5월 17일부터 30일간 크라우드펀딩을 진행한다.<br>&nbsp;</p>
      <b>[회사소개]</b>
      <p>엑스엔지니어링은 네오플라이(네오위즈게임즈)의 인큐베이팅을 받은 국내 IoT스타트업이다. 현재는 IBK기업은행의 핀테크 스타트업으로 선정되어 지원받고 있다. LG전자, 시스코, 퀄컴 출신의 창업자들로 구성되어 있으며, 기술 관련 특허를 3건 출원중이다. 지난 해 12월에 미래창조과학부와 한국인터넷진흥원으로부터 우수 핀테크 스타트업으로 선정된 바 있으며, 올 해 2월엔 바르셀로나에서 열린 Mobile World Congress 2016에 부스를 내고 참가하였다.</p>
    `,

    'footer.team': `Team`,
    'footer.jobs': `Jobs`,
    'footer.faq': `FAQ`,
    'footer.legal': `Legal`,
    'footer.presskit': `Press`,
    'footer.copyrights': `2017 X Lab Inc. Newport Beach, California. All Rights Reserved.`,
    'footer.email': `hey@spendwallet.com`

});
