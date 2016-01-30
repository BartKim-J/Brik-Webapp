let messages = require('../index');

module.exports = messages.merge({
  emailPlaceholder: `이메일 주소를 입력하세요`,
  'index.contactless.header': `
    <h2 class="SpendIndex-contactless-h2">
      어디서나 터치 한 번으로<br class="hidden-md hidden-lg">
      간편한 결제
    </h2>
  `,
  'index.contactless.paragraphs': /* Markdown */ `스펜드월렛은 엑스엔지니어링이 자체 개발한 MST기술이 적용되어 눈 깜짝할 사이에 자기장을 발생시켜 카드리더기에 결제신호를 송출합니다. 스펜드월렛을 카드리더기에 가까이대고 터치하면, 마치 플라스틱 카드로 긁는것과 똑같은 신호를 전달하기 때문에 모든 카드리더기에서 사용할 수 있습니다. 이제 어디서나 스펜드월렛으로 간편하게 터치하고, 결제하세요.`,
  'index.formMessageBoard': `출시 소식 구독하기`,
  'index.physicalCards.article': /* Markdown */ `## 지갑, 그 본연의 역할에 충실한<br class="hidden-md hidden-lg"> 스마트지갑

스펜드월렛은 단순한 전자기기가 아닙니다. 당신이 더 멋있고, 스마트하게 바꿔줄 단 하나의 지갑입니다. 스펜드월렛의 후면부에는 디지털정보로 저장할 수 없는 신분증, 명함을 담을 수 있는 가죽포켓이 내장되어있습니다. 이제 신용카드는 감추고, 당신을 멋지게 소개할 수 있는 카드만 스펜드월렛의 가죽포켓에 휴대하세요.`,
  legalDocs: require('./data/legalDocs')
});
