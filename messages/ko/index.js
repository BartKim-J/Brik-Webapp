let messages = require('../index');

module.exports = messages.merge({
    emailPlaceholder: `이메일 주소`,

    'index.heading_title': `매일 매일 변화하는<br /> 건강데이터를 손쉽게 확인 해보세요.`,
    'index.heading_1': `ASTERA는 개인의 건강데이터를 수집하고`,
    'index.heading_2': `분석할 수 있는 블록체인입니다.`,
    'index.heading_3': `무료로 제공되는 ASTERA 기기를 통해`,
    'index.heading_4': `손쉽게 데이터를 수집하고 관리 해보세요.`,
    'index.newsletter.heading': `더 많은 정보를 받아보고 싶으세요?`,
    'index.newsletter.submit': `구독`,
    'index.charge.description': `생체 데이터 블록체인을 위한<br />IoMT 기기`,
    'index.menu.whitepaper': `백서 다운로드 `,
    'index.menu.whitepaper_full': `전체`,
    'index.menu.whitepaper_full.content':'/WP/ASTERA_WP_KO_FULL.pdf',
    'index.menu.whitepaper_short':'요약',
    'index.menu.whitepaper_short.content':'/WP/ASTERA_WP_KO_SHORT.pdf',
    'index.button.language': `Language: English`,

    jobOpenings: require('./data/jobOpenings'),
    legalDocs: require('./data/legalDocs'),
    team: require('./data/team'),
    faqSections: require('./data/faqSections'),

    'menu.promotion': `Promotion`,

    'success.title': `감사합니다!`,
    'success.description': `이메일 등록이 성공적으로 완료되었습니다 <br> 곧 발송될 이메일에서 더 많은 정보와 혜택을 받아보실 수 있습니다`,
    'success.callToAction': `홈으로 돌아가기`,

    'footer.copyrights': `©2018 Astera. All Rights Reserved.`,
    'footer.email': `hey@astera.io`,

});
