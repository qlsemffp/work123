/**
 * fabData.js - SK하이닉스 반도체 웨이퍼 제조 공정 전체 데이터셋
 * 기준 문서: SK하이닉스 반도체 웨이퍼 제조 공정 (Wafer Fabrication) 완벽 해설서
 */

const CORE_PROCESSES = {
  'Thin Film': {
    nameKo: '박막 증착',
    nameEn: 'Thin Film',
    color: '#0284C7',
    badgeBg: 'rgba(2, 132, 199, 0.15)',
    badgeBorder: '#0284C7',
    icon: 'layers',
    summary: 'CVD, PVD, 열산화 등을 통해 수 나노미터(nm) 단위의 고순도 절연막 및 도전막을 웨이퍼 표면에 균일하게 코팅합니다.'
  },
  'Photo': {
    nameKo: '포토리소그래피',
    nameEn: 'Photo',
    color: '#EAB308',
    badgeBg: 'rgba(234, 179, 8, 0.15)',
    badgeBorder: '#EAB308',
    icon: 'sun',
    summary: '감광액(PR) 도포 후 포토마스크를 통해 자외선(UV/EUV)을 조사하여 설계된 초미세 회로 패턴을 웨이퍼 위에 투영 전사합니다.'
  },
  'Etch': {
    nameKo: '식각',
    nameEn: 'Etch',
    color: '#EF4444',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    badgeBorder: '#EF4444',
    icon: 'scissors',
    summary: 'PR 마스크로 보호되지 않은 영역의 산화막, 실리콘, 금속층을 플라즈마 건식 식각(Dry Etch)으로 정밀하게 깎아냅니다.'
  },
  'Diffusion': {
    nameKo: '확산·도핑·열처리',
    nameEn: 'Diffusion / Implant',
    color: '#10B981',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: '#10B981',
    icon: 'zap',
    summary: '실리콘 기판에 불순물 이온(P, As 등)을 주입(Implant)하고 급속 고온 열처리(Anneal)하여 소스/드레인 전도 영역을 형성합니다.'
  },
  'CMP': {
    nameKo: '화학기계연마',
    nameEn: 'CMP',
    color: '#8B5CF6',
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: '#8B5CF6',
    icon: 'disc',
    summary: '화학 슬러리와 연마 패드를 이용해 단차와 요철을 나노 단위로 깎아내어 거울처럼 평탄한 표면을 가공합니다.'
  },
  'Cleaning': {
    nameKo: '세정',
    nameEn: 'Cleaning',
    color: '#06B6D4',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    badgeBorder: '#06B6D4',
    icon: 'droplets',
    summary: '각 공정 단계마다 발생하는 미세 파티클, 금속 불순물, 화학 잔여물을 초순수(DI Water)와 약품으로 완벽하게 세정합니다.'
  }
};

const PARTS_DATA = [
  {
    part: 1,
    titleKo: 'Part 1: 활성 영역 정의 및 게이트 기초층 형성',
    titleEn: 'Active Area Definition & Gate Base Layer',
    range: [1, 9],
    desc: '웨이퍼 표면에 기초 산화막을 형성하고, 포토리소그래피와 식각으로 활성 영역을 오픈한 뒤 게이트 산화막과 폴리실리콘을 증착합니다.'
  },
  {
    part: 2,
    titleKo: 'Part 2: 게이트 전극 패터닝 및 소스/드레인 형성',
    titleEn: 'Gate Patterning, S/D Formation & CMP',
    range: [10, 18],
    desc: '폴리실리콘을 게이트 기둥으로 패터닝하고, 이온 주입과 고온 열처리를 거쳐 소스/드레인을 형성한 후 ILD 산화막 증착 및 CMP 평탄화를 진행합니다.'
  },
  {
    part: 3,
    titleKo: 'Part 3: 콘택 홀 형성 및 금속층 증착',
    titleEn: 'Contact Hole Formation & Metal Deposition',
    range: [19, 27],
    desc: '두꺼운 층간절연막을 수직 관통하여 소스와 드레인을 노출시키는 콘택 홀을 뚫고, 단차 피복성이 우수한 텅스텐 플러그와 상부 금속을 증착합니다.'
  },
  {
    part: 4,
    titleKo: 'Part 4: 금속 배선 패터닝 및 최종 소자 완성',
    titleEn: 'Metal Interconnect Patterning & MOSFET Completion',
    range: [28, 32],
    desc: '하나로 이어진 상부 금속층을 식각하여 독립된 소스 전극과 드레인 전극으로 분리함으로써 독립 스위칭이 가능한 완성된 N-Channel MOSFET을 완성합니다.'
  }
];

const FAB_STEPS = [
  {
    step: 1,
    stepStr: '01',
    titleKo: 'Silicon Oxide (초기 산화막 성장)',
    titleEn: 'Initial Thermal Oxidation',
    part: 1,
    category: 'Thin Film',
    categoryKo: '박막 증착 (산화)',
    purpose: '웨이퍼 표면 보호 및 후속 공정의 마스킹 절연막 형성',
    mechanism: '800~1,100℃ 고온 산화로에서 산소(O₂) 가스를 주입하여 실리콘 웨이퍼 최상단에 얇고 균일한 이산화규소(SiO₂) 절연 박막을 열적으로 성장시킵니다.',
    engineeringTip: '열산화막(Thermal Oxide)은 결함 밀도가 극히 낮아 웨이퍼 기판의 불순물 오염을 원천 차단하는 패시베이션(Passivation) 역할을 수행합니다.',
    parameters: {
      temperature: '800 ~ 1,100 ℃',
      reactant: '고순도 산소 (O₂)',
      equipment: 'Horizontal / Vertical Diffusion Furnace',
      resultLayer: 'SiO₂ 절연 산화막 (균일 박막)'
    },
    stateId: 'step_01_thermal_oxide'
  },
  {
    step: 2,
    stepStr: '02',
    titleKo: 'PR Coating (감광액 도포)',
    titleEn: 'Photoresist Spin Coating',
    part: 1,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '회로 패턴을 새기기 위한 빛 반응성 감광층(Photoresist) 균일 형성',
    mechanism: '산화막 상부에 액상의 감광액(PR, 노란색 층)을 스핀 코팅 방식으로 수천 RPM으로 고속 회전 도포하여 나노 두께의 균일 박막을 형성한 후 Soft Bake를 진행합니다.',
    engineeringTip: '점도(Viscosity)와 회전 가속도 및 속도를 정밀 제어하여 웨이퍼 전 영역의 두께 편차를 1% 이내로 엄격히 관리합니다.',
    parameters: {
      spinSpeed: '2,000 ~ 4,000 RPM',
      baking: 'Soft Bake (90~100℃)',
      material: '양화 감광액 (Positive Photoresist)',
      resultLayer: '균일 PR 감광층'
    },
    stateId: 'step_02_pr_coating'
  },
  {
    step: 3,
    stepStr: '03',
    titleKo: 'Exposure (노광 공정)',
    titleEn: 'UV / DUV Exposure',
    part: 1,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '포토마스크의 회로 패턴을 자외선(빛)으로 감광층에 전사',
    mechanism: '설계된 회로가 그려진 포토마스크를 장착하고 자외선(UV/DUV) 광원을 조사합니다. 빛을 받은 중앙 영역 감광액은 고분자 결합이 화학적으로 분해됩니다.',
    engineeringTip: '양화(Positive) PR의 경우 빛을 받은 영역이 화학적으로 약화되어 후속 알칼리 현상액에 쉽게 용해되는 성질을 갖습니다.',
    parameters: {
      lightSource: '자외선 (UV / ArF Excimer Laser)',
      mask: '크롬 패턴 석영 포토마스크',
      reaction: '광분해 (Photochemical Cleavage)',
      resultLayer: '노광 잠상(Latent Image) 형성'
    },
    stateId: 'step_03_exposure'
  },
  {
    step: 4,
    stepStr: '04',
    titleKo: 'Develop (현상 공정)',
    titleEn: 'Photoresist Development',
    part: 1,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '빛에 노출된 PR 영역을 용해하여 산화막 식각용 개구창(Window) 오픈',
    mechanism: '현상액(Developer, TMAH 등)을 분사하여 노광된 중심부 PR을 선택적으로 녹여냅니다. 이로써 산화막을 식각할 수 있는 중앙 개구창이 깨끗하게 드러납니다.',
    engineeringTip: '현상 후 잔여물(Scum)이 남지 않았는지 오버레이(Overlay) 및 임계 치수(CD, Critical Dimension)를 엄격히 광학 측정합니다.',
    parameters: {
      chemical: 'TMAH 현상액',
      rinse: '초순수 린스 & Spin Dry',
      inspection: 'CD 및 오버레이 정렬 검사',
      resultLayer: '오픈된 PR 개구 패턴'
    },
    stateId: 'step_04_develop'
  },
  {
    step: 5,
    stepStr: '05',
    titleKo: 'Etch (산화막 식각)',
    titleEn: 'Silicon Dioxide Etch',
    part: 1,
    category: 'Etch',
    categoryKo: '식각',
    purpose: 'PR 마스크가 없는 영역의 이산화규소(SiO₂) 선택적 제거',
    mechanism: '불소계 반응성 가스 플라즈마(건식 식각)를 가하여 개구부 산화막을 정밀하게 수직 식각합니다. 하부 실리콘 웨이퍼 기판 표면이 노출될 때까지 제어됩니다.',
    engineeringTip: '선택비(Selectivity): 상부 PR과 하부 실리콘은 최대한 깎이지 않고 중간 산화막만 빠르게 제거하도록 식각 가스 비율을 제어하는 것이 핵심입니다.',
    parameters: {
      method: '플라즈마 건식 식각 (Reactive Ion Etch)',
      gas: 'CF₄ / CHF₃ / Ar 플라즈마',
      selectivity: 'SiO₂ vs Si 선택비 > 15:1',
      resultLayer: '실리콘 표면 오픈 트렌치'
    },
    stateId: 'step_05_oxide_etch'
  },
  {
    step: 6,
    stepStr: '06',
    titleKo: 'PR Strip (감광액 제거)',
    titleEn: 'Photoresist Strip & Ashing',
    part: 1,
    category: 'Etch',
    categoryKo: '식각 / 세정',
    purpose: '식각 마스크 역할을 다한 잔여 유기 감광액 완전 제거',
    mechanism: '산소(O₂) 플라즈마 애싱(Ashing) 공정을 통해 표면에 잔존하는 노란색 PR 층을 CO, CO₂ 가스로 탄화 및 기화시켜 완전히 박리·제거합니다.',
    engineeringTip: '공정 결과 좌우에 단차가 생긴 산화막과 가운데가 오목하게 파여 노출된 패턴형 순수 실리콘 웨이퍼 표면이 형성됩니다.',
    parameters: {
      method: 'O₂ Plasma Ashing & Wet Strip',
      reaction: 'CxHy + O₂* -> CO₂ + H₂O (기화)',
      resultLayer: 'PR이 제거된 패턴 산화막 표면'
    },
    stateId: 'step_06_pr_strip'
  },
  {
    step: 7,
    stepStr: '07',
    titleKo: 'Gate Oxidation (초박막 게이트 산화막 성장)',
    titleEn: 'Ultra-thin Gate Oxide Growth',
    part: 1,
    category: 'Thin Film',
    categoryKo: '박막 증착 (산화)',
    purpose: '트랜지스터 핵심 채널 제어를 위한 초고순도 절연막(Gate Oxide) 형성',
    mechanism: '노출된 실리콘 바닥에 수 나노미터(nm) 두께의 매우 얇고 균일한 고품질 게이트 산화막(Gate Oxide)을 고온 열산화로 정밀 성장시킵니다.',
    engineeringTip: '게이트 산화막은 전자의 양자 터널링 누설을 차단하고 강한 전계(Electric Field)를 형성하는 트랜지스터의 핵심 심장부입니다.',
    parameters: {
      thickness: '1 ~ 2 nm (원자층 수준)',
      method: 'Thermal Dry Oxidation / RTO',
      quality: '극저 결함 계면(Si-SiO₂ Interface)',
      resultLayer: '초박막 게이트 산화막'
    },
    stateId: 'step_07_gate_oxidation'
  },
  {
    step: 8,
    stepStr: '08',
    titleKo: 'Cleaning (게이트 산화 후 세정)',
    titleEn: 'Post-Oxidation Clean',
    part: 1,
    category: 'Cleaning',
    categoryKo: '세정',
    purpose: '게이트 전극 증착 전 계면 파티클 및 화학적 오염 완벽 제거',
    mechanism: '초순수(DI Water)와 극미량 화학 약품을 순차 분사하여 게이트 산화막 표면의 나노 파티클과 유기 오염물을 세정합니다.',
    engineeringTip: '게이트 계면에 원자 단위의 불순물이라도 잔류하면 소자의 문턱 전압(Vth) 편차와 신뢰성 파괴를 유발하므로 무결점 세정이 필수입니다.',
    parameters: {
      liquid: '초순수 (Ultra-Pure DI Water, 18.2 MΩ·cm)',
      cleanType: 'Megasonic Chemical Clean',
      resultLayer: '무결점 청정 표면'
    },
    stateId: 'step_08_gate_clean'
  },
  {
    step: 9,
    stepStr: '09',
    titleKo: 'Poly Si Deposition (게이트 전극 증착)',
    titleEn: 'Polysilicon Gate Deposition',
    part: 1,
    category: 'Diffusion',
    categoryKo: '확산·증착',
    purpose: '트랜지스터의 전도성 스위치 제어 게이트 역할을 할 전극층 증착',
    mechanism: 'LPCVD(저압 화학기상증착) 챔버에서 실란(SiH₄) 가스를 반응시켜 웨이퍼 전면에 균일한 두께의 다결정 실리콘(Poly-Si, 민트색 층)을 두껍게 증착합니다.',
    engineeringTip: '후속 도핑 공정을 통해 저항을 대폭 낮춰 금속에 버금가는 고전도성 게이트 전극으로 기능하게 됩니다.',
    parameters: {
      gas: '실란 (SiH₄) -> Si(s) + 2H₂(g)',
      equipment: 'LPCVD (Low Pressure CVD)',
      temperature: '600 ~ 650 ℃',
      resultLayer: '전면 다결정 실리콘(Poly-Si) 층'
    },
    stateId: 'step_09_poly_si_dep'
  },
  {
    step: 10,
    stepStr: '10',
    titleKo: 'Gate PR Coating (게이트 감광액 재도포)',
    titleEn: 'Gate Mask PR Coating',
    part: 2,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '게이트 전극의 미세 선폭을 정의하기 위한 감광층 형성',
    mechanism: '다결정 실리콘 층 위에 보라색 PR(감광액)을 스핀 코팅 방식으로 재도포하고 베이크하여 감광막을 형성합니다.',
    engineeringTip: '이 단계에서 정의되는 게이트 선폭(Gate Length)이 트랜지스터의 스위칭 동작 속도와 전력 소비를 결정짓는 핵심 지표가 됩니다.',
    parameters: {
      material: '고해상도 DUV 감광액',
      speed: '고속 스핀 코팅',
      resultLayer: 'Poly-Si 상부 균일 PR층'
    },
    stateId: 'step_10_gate_pr_coating'
  },
  {
    step: 11,
    stepStr: '11',
    titleKo: 'Gate Exposure & Develop (게이트 노광 및 현상)',
    titleEn: 'Gate Exposure & Development',
    part: 2,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '게이트 기둥이 될 중앙 부위만 PR 패턴으로 보호 마스킹',
    mechanism: '게이트 포토마스크를 통해 자외선을 조사하고 현상액으로 노광 부위를 씻어내어, 중앙의 좁은 직사각형 기둥 형상만 PR 마스크로 남깁니다.',
    engineeringTip: '임계 치수(CD, Critical Dimension) 관리가 가장 엄격한 공정으로, 오차 허용 범위가 수 옹스트롬(Å) 수준으로 관리됩니다.',
    parameters: {
      criticalDimension: '게이트 선폭 (Gate Length)',
      alignment: '활성 영역 중앙 정밀 정렬',
      resultLayer: '게이트 보호용 PR 기둥 마스크'
    },
    stateId: 'step_11_gate_photo_dev'
  },
  {
    step: 12,
    stepStr: '12',
    titleKo: 'Gate Etch (게이트 폴리실리콘 식각)',
    titleEn: 'Gate Polysilicon Anisotropic Etch',
    part: 2,
    category: 'Etch',
    categoryKo: '식각',
    purpose: 'PR 마스크 외곽의 불필요한 폴리실리콘을 제거하여 독립 게이트 기둥 완성',
    mechanism: '강한 이방성(Anisotropic) 플라즈마 건식 식각을 가하여 수직 프로파일을 유지하면서 폴리실리콘을 하부 게이트 산화막까지 깎아냅니다.',
    engineeringTip: '하부 초박막 산화막을 뚫고 실리콘 기판을 깎지 않도록, 산화막에 대한 선택비가 높은 식각 가스 조성을 사용합니다.',
    parameters: {
      etchType: '이방성 수직 건식 플라즈마 식각',
      profile: '수직 90도 게이트 측벽 형성',
      resultLayer: '수직 패터닝된 게이트 기둥'
    },
    stateId: 'step_12_gate_etch'
  },
  {
    step: 13,
    stepStr: '13',
    titleKo: 'Gate PR Strip & Clean (게이트 PR 박리 및 세정)',
    titleEn: 'Gate PR Strip & Clean',
    part: 2,
    category: 'Etch',
    categoryKo: '식각 / 세정',
    purpose: '게이트 상부의 잔여 PR을 완전 제거하고 표면을 청정화',
    mechanism: '산소 플라즈마 애싱으로 상부 PR을 박리하고 초순수로 미세 식각 파티클을 깨끗이 씻어내어 단독 직사각형 형태의 Poly-Si 게이트 전극을 드러냅니다.',
    engineeringTip: '단면 구조상 웨이퍼 중앙에 우뚝 솟은 게이트 기둥과 양옆으로 노출된 실리콘 기판 표면이 명확히 대비됩니다.',
    parameters: {
      method: 'O₂ Ashing & Wet Clean',
      particleCount: '0에 근접하도록 초순수 린스',
      resultLayer: '독립된 순수 Poly-Si 게이트 전극'
    },
    stateId: 'step_13_gate_strip_clean'
  },
  {
    step: 14,
    stepStr: '14',
    titleKo: 'Ion Implant (소스/드레인 이온 주입)',
    titleEn: 'Source/Drain Ion Implantation',
    part: 2,
    category: 'Diffusion',
    categoryKo: '확산·도핑',
    purpose: '실리콘 기판 내부에 전도성 불순물(도펀트)을 주입하여 소스/드레인 정의',
    mechanism: '고전압으로 가속된 5가 불순물 이온(비소 As 또는 인 P) 빔을 수직 조사합니다. Poly-Si 게이트가 마스크 역할을 하여 게이트 양쪽 실리콘 표면 아래로만 이온이 침투합니다.',
    engineeringTip: '자기정렬(Self-Aligned): 게이트 전극 자체가 마스크가 되므로 별도의 마스크 정렬 오차 없이 소스/드레인이 게이트 양단에 완벽히 정렬됩니다.',
    parameters: {
      dopant: '5가 이온 (비소 As+ / 인 P+)',
      accelerationEnergy: '수십 ~ 수백 keV 고전압',
      principle: '자가 정렬 (Self-Aligned Process)',
      resultLayer: '이온 주입된 잠재 N형 영역'
    },
    stateId: 'step_14_ion_implant'
  },
  {
    step: 15,
    stepStr: '15',
    titleKo: 'Anneal (급속 고온 열처리 활성화)',
    titleEn: 'Rapid Thermal Annealing (RTA)',
    part: 2,
    category: 'Diffusion',
    categoryKo: '확산·열처리',
    purpose: '주입된 이온의 전기적 활성화 및 손상된 실리콘 결정 격자 복원',
    mechanism: '급속 열처리 장비(RTA)로 900~1,000℃ 고온을 순간 가열합니다. 이온 충돌로 깨진 실리콘 격자가 치유되고 도펀트가 치환되어 전자를 공급하는 N영역이 완성됩니다.',
    engineeringTip: '단면 변화: 화면에서 노란색 반원 형태로 N (Source)과 N (Drain) 웰 영역이 실리콘 기판 내에 선명하게 드러납니다.',
    parameters: {
      temperature: '900 ~ 1,000 ℃',
      equipment: 'RTA (Rapid Thermal Annealer)',
      effect: '격자 복원 및 도펀트 전기적 활성화',
      resultLayer: 'N+ Source / N+ Drain 웰 완성'
    },
    stateId: 'step_15_anneal_activation'
  },
  {
    step: 16,
    stepStr: '16',
    titleKo: 'Oxidation / ILD (층간 절연막 증착)',
    titleEn: 'Interlayer Dielectric (ILD) Deposition',
    part: 2,
    category: 'Thin Film',
    categoryKo: '박막 증착',
    purpose: '게이트 전극과 상부 금속 배선 간의 전기적 간섭 및 단락 방지',
    mechanism: '화학기상증착(CVD)을 통해 두꺼운 산화막(ILD, 붉은색 층)을 웨이퍼 전체에 증착합니다. 게이트 구조물로 인해 표면에 큰 요철과 굴곡이 발생합니다.',
    engineeringTip: '공정 이슈: 이 굴곡 상태 그대로 후속 포토 공정을 진행하면 초점 심도(DOF, Depth of Focus) 불량으로 회로가 왜곡되므로 반드시 평탄화가 필요합니다.',
    parameters: {
      material: 'SiO₂ / BPSG / Low-k Dielectric',
      method: 'PECVD (플라즈마 CVD)',
      challenge: '심한 표면 단차(Step Height)',
      resultLayer: '요철형 층간 절연막 (ILD)'
    },
    stateId: 'step_16_ild_deposition'
  },
  {
    step: 17,
    stepStr: '17',
    titleKo: 'CMP (화학기계연마 평탄화)',
    titleEn: 'Chemical Mechanical Polishing (CMP)',
    part: 2,
    category: 'CMP',
    categoryKo: '화학기계연마',
    purpose: '돌출된 절연 산화막 요철을 거울처럼 매끄럽게 평탄화',
    mechanism: '회전하는 연마 패드에 나노 연마 입자가 포함된 화학 슬러리(Slurry)를 공급하며 표면을 물리·화학적으로 연마하여 완벽한 수평면을 만듭니다.',
    engineeringTip: '핵심 기술: 다층 금속 배선 공정(Multilevel Interconnect)을 가능하게 만든 현대 반도체 고집적화의 1등 공신 단위 공정입니다.',
    parameters: {
      slurry: '실리카 나노 입자 + 화학 첨가제',
      pad: '다공성 폴리우레탄 연마 패드',
      result: '원자 단위 고평탄면 (Ultra-flat Surface)',
      resultLayer: '평탄화된 ILD 절연막'
    },
    stateId: 'step_17_cmp_polishing'
  },
  {
    step: 18,
    stepStr: '18',
    titleKo: 'Cleaning (연마 후 정밀 세정)',
    titleEn: 'Post-CMP Chemical Cleaning',
    part: 2,
    category: 'Cleaning',
    categoryKo: '세정',
    purpose: '연마 과정에서 발생한 잔여 슬러리 나노 입자 및 화학 잔여물 완전 세정',
    mechanism: '브러시 스크러버와 초순수, 특수 약품을 이용해 표면에 흡착된 슬러리 입자를 완벽히 제거합니다.',
    engineeringTip: '이 단계 완료 후 기판(Wafer), 소스/드레인 N웰, Poly Si 게이트가 평탄화된 붉은색 ILD 속에 매몰된 중간 소자 단면이 완성됩니다.',
    parameters: {
      equipment: 'PVA Brush Scrubber & Megasonic',
      residualControl: '나노 입자 잔류 제로화',
      resultLayer: '초평탄 청정 ILD 표면'
    },
    stateId: 'step_18_post_cmp_clean'
  },
  {
    step: 19,
    stepStr: '19',
    titleKo: 'Contact PR Coating (콘택 감광액 도포)',
    titleEn: 'Contact Hole PR Coating',
    part: 3,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '콘택 홀 구멍 패턴을 형성하기 위한 감광층 도포',
    mechanism: '평탄화된 ILD 산화막 위에 보라색 감광액(PR)을 스핀 코팅 방식으로 도포하고 Soft Bake를 진행합니다.',
    engineeringTip: '하부 층이 CMP로 평탄화되어 있어 PR 두께가 전 영역에서 완벽하게 균일하게 유지됩니다.',
    parameters: {
      uniformity: '두께 오차 0.5% 이내 관리',
      bake: 'Soft Bake',
      resultLayer: '평탄 ILD 상부 균일 PR층'
    },
    stateId: 'step_19_contact_pr_coating'
  },
  {
    step: 20,
    stepStr: '20',
    titleKo: 'Contact Exposure (콘택 노광)',
    titleEn: 'Contact Hole UV Exposure',
    part: 3,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '소스와 드레인 상단 위치에 정확히 맞춘 콘택 마스크 패턴 조사',
    mechanism: '소스와 드레인 웰 위치에 정확히 정렬된 콘택 포토마스크를 통해 자외선을 선택적으로 노광합니다.',
    engineeringTip: '정렬 정밀도(Alignment): 하부의 N영역 정중앙에 홀이 위치하도록 나노미터 단위의 오버레이 정렬이 요구됩니다.',
    parameters: {
      overlayTarget: 'N+ 소스 및 드레인 정중앙',
      light: 'High Numerical Aperture DUV',
      resultLayer: '콘택 홀 노광 잠상'
    },
    stateId: 'step_20_contact_exposure'
  },
  {
    step: 21,
    stepStr: '21',
    titleKo: 'Contact Develop (콘택 현상)',
    titleEn: 'Contact Hole Development',
    part: 3,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '노광된 부위를 용해하여 두 개의 콘택 홀 개구부 오픈',
    mechanism: '현상액을 분사하여 빛을 받은 소스 및 드레인 직상부의 PR을 선택적으로 녹여내어 두 개의 수직 구멍 개구부를 형성합니다.',
    engineeringTip: '원형 콘택 홀 개구창의 수직 프로파일과 직경(CD) 균일성을 전자현미경(CD-SEM)으로 측정합니다.',
    parameters: {
      developer: 'TMAH 수용액',
      check: 'CD-SEM 형상 측정',
      resultLayer: '소스/드레인 상부 2개 PR 개구창'
    },
    stateId: 'step_21_contact_develop'
  },
  {
    step: 22,
    stepStr: '22',
    titleKo: 'Contact Inspection (콘택 정렬 검사)',
    titleEn: 'Contact Pattern Overlay Inspection',
    part: 3,
    category: 'Photo',
    categoryKo: '포토 / 검사',
    purpose: '식각 전 홀 위치가 소스/드레인 영역을 벗어나지 않았는지 정밀 판정',
    mechanism: '광학 및 전자선 계측기로 하부 소스/드레인 웰과 상부 PR 개구부 간의 오버레이 정렬 오차(Overlay Error)를 검사합니다.',
    engineeringTip: '만약 콘택 홀이 게이트 전극 쪽으로 치우치면 쇼트 불량이 발생하므로 수 나노미터 이하의 정밀도가 검증되어야 통과됩니다.',
    parameters: {
      spec: 'Overlay Tolerance < 2 nm',
      action: '기준 초과 시 Rework (PR 박리 후 재포토)',
      resultLayer: '검증 완료된 콘택 마스크'
    },
    stateId: 'step_22_contact_inspection'
  },
  {
    step: 23,
    stepStr: '23',
    titleKo: 'Contact Etch (콘택 홀 고종횡비 식각)',
    titleEn: 'High Aspect Ratio (HAR) Contact Etch',
    part: 3,
    category: 'Etch',
    categoryKo: '식각',
    purpose: '절연 산화막을 수직 관통하여 소스/드레인 실리콘 표면 노출',
    mechanism: '고이방성 플라즈마 건식 식각으로 두꺼운 산화막을 수직으로 깊게 파내려갑니다. 하부 N형 웰 표면이 깨끗하게 드러날 때까지 정밀 진행합니다.',
    engineeringTip: '고종횡비 식각(HAR): 좁고 깊은 구멍을 바닥까지 휘어짐 없이 수직으로 뚫어내는 고난도 식각 기술이 적용됩니다.',
    parameters: {
      aspectRatio: '고종횡비 (Aspect Ratio 10:1 이상)',
      gas: 'C₄F₈ / CH₂F₂ / Ar 고에너지 플라즈마',
      resultLayer: '수직 관통된 2개의 깊은 콘택 홀'
    },
    stateId: 'step_23_contact_etch'
  },
  {
    step: 24,
    stepStr: '24',
    titleKo: 'Contact PR Strip (감광액 제거)',
    titleEn: 'Contact PR Strip',
    part: 3,
    category: 'Etch',
    categoryKo: '식각 / 세정',
    purpose: '산화막 식각을 마친 상부 PR 마스크 완전 박리',
    mechanism: '산소 플라즈마 애싱을 적용하여 ILD 상부에 남아 있는 유기 감광액 층을 완전 연소시켜 제거합니다.',
    engineeringTip: '깊은 홀 내벽에 식각 폴리머 부산물이 남지 않도록 완벽하게 기화 박리시킵니다.',
    parameters: {
      reaction: 'O₂ Ashing Chamber',
      resultLayer: 'PR이 제거된 콘택 홀 ILD 표면'
    },
    stateId: 'step_24_contact_pr_strip'
  },
  {
    step: 25,
    stepStr: '25',
    titleKo: 'Contact Cleaning (콘택 홀 세정)',
    titleEn: 'Post-Etch Contact Clean',
    part: 3,
    category: 'Cleaning',
    categoryKo: '세정',
    purpose: '금속 증착 전 콘택 홀 바닥 실리콘의 자연 산화막 및 잔여물 제거',
    mechanism: '초순수와 희석된 불산(DHF) 세정을 통해 콘택 홀 바닥에 형성된 얇은 자연 산화막을 제거하여 금속-실리콘 간 접촉 저항을 극소화합니다.',
    engineeringTip: '접촉 저항(Contact Resistance)은 트랜지스터의 동작 전류를 좌우하므로 홀 바닥 청정화가 전기적 성능에 직결됩니다.',
    parameters: {
      chemical: 'Diluted HF (희석 불산) + 초순수 린스',
      target: '자연 산화막(Native Oxide) 박리',
      resultLayer: '순수 청정 노출된 N+ 소스/드레인 바닥'
    },
    stateId: 'step_25_contact_clean'
  },
  {
    step: 26,
    stepStr: '26',
    titleKo: 'Barrier & Plug CVD (배리어 메탈 및 텅스텐 플러그 매립)',
    titleEn: 'Barrier Metal & Tungsten Plug Fill',
    part: 3,
    category: 'Thin Film',
    categoryKo: '박막 증착 (금속)',
    purpose: '콘택 홀 내부를 빈틈(Void) 없이 전도성 금속으로 가득 채움',
    mechanism: 'CVD 공정으로 확산 방지막(Ti/TiN 배리어 메탈)을 얇게 코팅한 후 단차 피복성이 뛰어난 텅스텐(W)을 증착하여 깊은 콘택 홀을 빈틈없이 매립합니다.',
    engineeringTip: '텅스텐 플러그(Contact Plug) 기술을 통해 절연막 속에 매몰되어 있던 소스와 드레인이 상부로 도통되는 물리적 전도 기둥이 완성됩니다.',
    parameters: {
      barrier: 'Ti / TiN (확산 방지 및 부착층)',
      plugMetal: 'WF₆ + H₂ -> W(텅스텐) + 6HF',
      coverage: '단차 피복성(Step Coverage) > 95%',
      resultLayer: '매립된 2개의 텅스텐 콘택 플러그'
    },
    stateId: 'step_26_metal_plug_fill'
  },
  {
    step: 27,
    stepStr: '27',
    titleKo: 'Blanket Metal Deposition (상부 전극 금속층 증착)',
    titleEn: 'Blanket Metal Interconnect Layer CVD/PVD',
    part: 3,
    category: 'Thin Film',
    categoryKo: '박막 증착 (금속)',
    purpose: '상부 전체를 전도성 은백색 금속판으로 덮어 배선 모재 형성',
    mechanism: '텅스텐 플러그 상부 전체에 알루미늄/구리 등의 고전도성 금속층을 두껍게 증착합니다. 이로써 소스와 드레인이 상부 금속판과 직접 전기적으로 연결됩니다.',
    engineeringTip: '현재 단계에서는 하나의 금속판으로 소스와 드레인이 연결되어 단락(쇼트)된 상태이므로, 다음 단계에서 개별 배선으로 분리해야 합니다.',
    parameters: {
      material: '알루미늄 합금 (Al-Cu) / 구리 (Cu)',
      method: 'Sputtering PVD / Metal CVD',
      resultLayer: '상부 전면을 덮은 은백색 금속판'
    },
    stateId: 'step_27_blanket_metal'
  },
  {
    step: 28,
    stepStr: '28',
    titleKo: 'Metal PR Coating (금속 배선 감광액 도포)',
    titleEn: 'Metal Pattern PR Coating',
    part: 4,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '소스와 드레인 배선 사이를 분리하기 위한 감광층 형성',
    mechanism: '금속층 위에 감광액(PR)을 균일하게 도포하고 베이크하여 배선 패터닝을 준비합니다.',
    engineeringTip: '금속 표면의 높은 빛 반사율로 인한 정재파 효과(Standing Wave Effect)를 방지하기 위해 반사방지막(BARC) 기술이 함께 적용됩니다.',
    parameters: {
      antiReflection: 'BARC (Bottom Anti-Reflective Coating)',
      resultLayer: '금속층 상부 균일 PR층'
    },
    stateId: 'step_28_metal_pr_coating'
  },
  {
    step: 29,
    stepStr: '29',
    titleKo: 'Metal Exposure (금속 배선 노광)',
    titleEn: 'Metal Line Separation Exposure',
    part: 4,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '중앙 게이트 상부의 금속 부위만 노광하여 제거 마스크 설계',
    mechanism: '금속 배선 마스크로 자외선을 조사합니다. 소스와 드레인 윗부분은 가리고, 가운데 게이트 상부의 불필요한 금속 영역만 선택 노광합니다.',
    engineeringTip: '배선 분리 설계: 소스와 드레인 사이에 원치 않는 단락을 차단하고 독립적인 단자 전압 인가가 가능하도록 분리 틈새를 정밀하게 노광합니다.',
    parameters: {
      pattern: '중앙 분리 슬릿 (Isolation Gap)',
      resultLayer: '중앙 분리부 노광 잠상'
    },
    stateId: 'step_29_metal_exposure'
  },
  {
    step: 30,
    stepStr: '30',
    titleKo: 'Metal Develop (금속 배선 현상)',
    titleEn: 'Metal Pattern Development',
    part: 4,
    category: 'Photo',
    categoryKo: '포토리소그래피',
    purpose: '가운데 금속을 깎아낼 수 있도록 중앙 PR 개구 틈새 오픈',
    mechanism: '현상액을 분사하여 노광된 중앙 PR을 녹여냅니다. 소스와 드레인 위의 금속만 PR로 보호되고 중앙 분리선 부위의 금속판이 노출됩니다.',
    engineeringTip: '금속 식각용 PR 패턴이 완벽한 직사각형 형태로 좌우 대칭을 이루는지 오버레이를 최종 확인합니다.',
    parameters: {
      gapWidth: '분리 갭 임계 치수 관리',
      resultLayer: '좌우 2개로 분리된 보호 PR 패턴'
    },
    stateId: 'step_30_metal_develop'
  },
  {
    step: 31,
    stepStr: '31',
    titleKo: 'Metal Etch (금속 식각 - 소스/드레인 배선 격리)',
    titleEn: 'Metal Interconnect Dry Etch',
    part: 4,
    category: 'Etch',
    categoryKo: '식각',
    purpose: '중앙의 불필요한 금속을 식각하여 독립된 소스 전극과 드레인 전극으로 격리',
    mechanism: '염소계 플라즈마 건식 식각을 가하여 노출된 중앙 금속을 하부 ILD 산화막이 드러날 때까지 수직 식각하여 소스/드레인 배선을 완벽히 분리합니다.',
    engineeringTip: '이로써 소스 전극과 드레인 전극 사이에 물리적 공백이 생겨 독립적인 전압을 인가할 수 있는 독립 전극으로 탈바꿈합니다.',
    parameters: {
      gas: 'Cl₂ / BCl₃ 금속 식각 플라즈마',
      isolation: '소스-드레인 간 전기적 완전 절연',
      resultLayer: '독립 격리된 2개의 금속 전극 패드'
    },
    stateId: 'step_31_metal_etch'
  },
  {
    step: 32,
    stepStr: '32',
    titleKo: 'PR Strip & Final Cleaning (최종 PR 박리 및 MOSFET 소자 완성)',
    titleEn: 'Final PR Strip & Clean (MOSFET Completion)',
    part: 4,
    category: 'Cleaning',
    categoryKo: '세정 / 완성',
    purpose: '상부 감광액을 깨끗이 제거하여 3차원 완제품 N-Channel MOSFET 소자 도출',
    mechanism: '산소 플라즈마로 잔여 PR을 완전 박리하고 초순수로 최종 세정합니다. 이제 트랜지스터의 모든 부품(기판, 게이트, 소스, 드레인, 독립 금속 배선)이 완벽하게 결합되었습니다.',
    engineeringTip: '실리콘 잉곳에서 시작하여 32단계 정밀 나노 공정을 거쳐 현대 모든 디지털 연산과 메모리의 기본 단위인 트랜지스터가 완성되었습니다.',
    parameters: {
      finalClean: 'MegaSonic DI Water Final Rinse',
      finalDevice: 'N-Channel Planar MOSFET',
      function: '초고속 전계효과 스위칭 트랜지스터',
      resultLayer: '최종 완성된 MOSFET 3차원 단면 구조'
    },
    stateId: 'step_32_final_mosfet'
  }
];

const MOSFET_COMPONENTS = {
  wafer: {
    name: '기판 (Wafer Substrate)',
    material: 'P-Type Bulk Silicon',
    role: '전체 소자의 물리적 지지체 역할을 하며 정공(Hole)이 다수 캐리어인 P형 베이스 영역입니다.',
    techDetail: '비저항과 순도가 엄격히 제어된 단결정 실리콘 잉곳에서 슬라이싱 및 연마된 고순도 기판입니다.'
  },
  source: {
    name: '소스 (Source, S)',
    material: 'N+ 도핑 실리콘 (비소 As/인 P 주입)',
    role: '전류를 구성하는 주체인 전자(Electron)를 풍부하게 공급하는 음극 단자입니다.',
    techDetail: '자가 정렬(Self-Aligned) 이온 주입 및 급속 열처리(RTA)로 게이트 측벽에 완벽히 정렬된 얕은 접합(Shallow Junction)입니다.'
  },
  drain: {
    name: '드레인 (Drain, D)',
    material: 'N+ 도핑 실리콘 (비소 As/인 P 주입)',
    role: '양(+)의 드레인 전압(V_DS)이 인가되었을 때 소스에서 방출된 전자를 강하게 끌어당겨 흡수하는 출력 단자입니다.',
    techDetail: '게이트 전계에 의해 형성된 채널을 통과한 전자가 모여 드레인 전류(I_DS)를 형성합니다.'
  },
  gate: {
    name: '게이트 (Gate, G)',
    material: '고농도 도핑 Poly-Si (다결정 실리콘)',
    role: '전압(V_GS)을 가해 소스와 드레인 사이의 전도 채널을 켜고 끄는 핵심 제어 스위치 밸브입니다.',
    techDetail: '현대 최첨단 반도체에서는 저항 감소를 위해 메탈 게이트(HKMG)로 진화했습니다.'
  },
  gateOxide: {
    name: '게이트 산화막 (Gate Oxide)',
    material: '초박막 이산화규소 (SiO₂) / High-k',
    role: '게이트 전극과 실리콘 기판 사이를 절연하여 누설 전류를 막고 강한 전계(Electric Field)를 유도합니다.',
    techDetail: '두께가 1~2nm에 불과하며, 양자역학적 터널링 누설을 줄이기 위해 원자층 증착(ALD) 기술이 사용됩니다.'
  },
  ild: {
    name: '층간 절연막 (ILD)',
    material: '평탄화된 이산화규소 (Planarized SiO₂)',
    role: '하부 게이트 및 소스/드레인과 상부 금속 배선 간의 불필요한 단락과 정전용량 간섭을 완벽히 차단합니다.',
    techDetail: 'CMP(화학기계연마) 공정을 통해 원자 단위의 거울 같은 수평면으로 가공되어 다층 배선을 가능하게 합니다.'
  },
  contactPlug: {
    name: '콘택 플러그 (Contact Plug)',
    material: '텅스텐 (W) & Ti/TiN 배리어',
    role: '두꺼운 ILD 절연막을 수직으로 관통하여 소스와 드레인을 상부 금속 배선과 전기적으로 직결합니다.',
    techDetail: '고종횡비(HAR) 플라즈마 식각과 CVD 텅스텐 매립으로 빈틈(Void) 없이 형성됩니다.'
  },
  metal: {
    name: '금속 배선 (Metal Interconnect)',
    material: '알루미늄-구리 합금 (Al-Cu) / 구리 (Cu)',
    role: '외부 전원선(Vdd, Vss) 및 신호선(비트라인, 워드라인)과 트랜지스터를 연결하는 고속 전기 고속도로입니다.',
    techDetail: '식각 공정을 통해 소스 배선과 드레인 배선이 완전히 전기적으로 격리되어 독립된 신호 제어가 가능합니다.'
  }
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '14단계 이온 주입(Ion Implant) 공정에서 소스와 드레인이 별도의 포토마스크 없이 게이트 양옆에 완벽하게 정렬될 수 있었던 핵심 원리는 무엇인가요?',
    options: [
      '자기정렬 (Self-Aligned Process)',
      '광학 근접 보정 (OPC)',
      '화학기계연마 (CMP)',
      '초순수 세정 (DI Water Clean)'
    ],
    answer: 0,
    explanation: '이미 형성된 Poly-Si 게이트 전극 자체가 마스크 역할을 하여 게이트 양옆의 실리콘 표면 아래로만 이온이 침투하므로, 마스크 정렬 오차 없이 완벽하게 정렬되는 "자가 정렬(Self-Aligned)" 공정입니다.'
  },
  {
    id: 2,
    question: '16단계에서 두꺼운 층간절연막(ILD)을 증착한 후, 17단계에서 CMP(화학기계연마)를 반드시 수행해야 하는 결정적인 이유는 무엇인가요?',
    options: [
      '실리콘 기판의 두께를 줄이기 위해',
      '표면 요철로 인한 초점 심도(DOF) 불량을 방지하고 평탄면을 확보하기 위해',
      '금속 배선의 전기 전도도를 10배 높이기 위해',
      '게이트 산화막을 제거하기 위해'
    ],
    answer: 1,
    explanation: '게이트 구조물로 인해 ILD 표면에 심한 요철과 단차가 발생합니다. 이를 평탄화하지 않고 후속 포토 공정을 진행하면 빛의 초점 심도(DOF)가 맞지 않아 회로가 왜곡되므로, CMP를 통해 거울처럼 매끄러운 평면을 만들어야 합니다.'
  },
  {
    id: 3,
    question: '03단계 노광 공정에서 사용된 "양화 감광액(Positive PR)"의 화학적 특성은 무엇인가요?',
    options: [
      '빛을 받은 영역이 경화되어 용해되지 않는다.',
      '빛을 받은 영역의 고분자 결합이 분해되어 현상액에 쉽게 용해된다.',
      '빛과 반응하지 않고 열에 의해서만 반응한다.',
      '자외선을 받으면 금속으로 변한다.'
    ],
    answer: 1,
    explanation: '양화(Positive) PR은 자외선(빛)을 받은 부위의 화학적 결합이 약화되어 후속 현상액(Developer)에 용해되어 씻겨 나가는 특성을 갖습니다.'
  },
  {
    id: 4,
    question: 'N-Channel MOSFET에서 게이트 전압(V_GS)을 충분히 양(+)으로 가했을 때 일어나는 물리적 현상은 무엇인가요?',
    options: [
      '소스와 드레인이 영구적으로 타버린다.',
      '산화막 아래 실리콘 표면에 전자가 모여 반전층(N-Channel)이 형성되며 전류가 흐른다.',
      '금속 배선이 단락(쇼트)되어 작동이 멈춘다.',
      'P형 기판이 N형 기판으로 영구 변환된다.'
    ],
    answer: 1,
    explanation: '게이트에 양전압을 인가하면 정전기적 전계(Electric Field)에 의해 기판 내 소수 캐리어인 전자들이 산화막 바로 아래로 끌어당겨져 "반전층(N-Channel)"을 형성합니다. 이를 통해 소스에서 드레인으로 전자가 이동하며 전류가 도통됩니다.'
  },
  {
    id: 5,
    question: '23단계 콘택 홀 식각 공정에서 수직으로 좁고 깊은 구멍을 바닥까지 뚫어내기 위해 요구되는 핵심 식각 기술은?',
    options: [
      '습식 등방성 식각 (Wet Isotropic Etch)',
      '고종횡비 식각 (High Aspect Ratio Dry Etch)',
      '스핀 코팅 식각 (Spin Coating)',
      '열산화 식각 (Thermal Etch)'
    ],
    answer: 1,
    explanation: '두꺼운 ILD 절연막을 직경 대비 깊이가 10배 이상인 비율로 휘어짐 없이 바닥까지 수직으로 뚫어내야 하므로 "고종횡비(HAR, High Aspect Ratio)" 플라즈마 건식 식각 기술이 필수적입니다.'
  },
  {
    id: 6,
    question: '반도체 칩 제조에서 단 한 번의 연속 가공이 아니라 6대 공정(박막, 포토, 식각, 확산, CMP, 세정)을 수십~수백 회 반복하는 궁극적인 이유는?',
    options: [
      '장비 고장을 방지하기 위해',
      '각 배선 층(Layer)마다 고유한 회로 패턴을 3차원으로 적층하여 미세 트랜지스터와 배선망을 구성하기 위해',
      '웨이퍼의 무게를 가볍게 만들기 위해',
      '단위 공정 시간을 단축하기 위해'
    ],
    answer: 1,
    explanation: '반도체 칩은 수십억 개의 트랜지스터와 수십 킬로미터 길이의 다층 금속 배선망이 수직으로 입체 적층된 구조이므로, 층(Layer)마다 고유한 포토마스크를 적용하며 6대 단위 공정을 반복 누적해야만 완성됩니다.'
  }
];

const TECH_ROADMAP = [
  {
    title: 'Planar MOSFET (평면형 트랜지스터)',
    era: '기본 초석 원리',
    icon: 'square',
    badge: 'Foundation',
    badgeColor: '#38BDF8',
    desc: '본 매뉴얼에서 다룬 기판 상에 평면으로 제작된 2D MOSFET입니다. 게이트가 채널의 상부 한 면만 제어하는 구조로 모든 현대 디지털 반도체의 동작 원리적 뿌리입니다.'
  },
  {
    title: 'FinFET (3차원 핀 트랜지스터)',
    era: '1x nm ~ 3nm 도입',
    icon: 'box',
    badge: '3D Channel',
    badgeColor: '#10B981',
    desc: '단채널 효과(Short Channel Effect)와 누설 전류를 억제하기 위해 채널을 상어 지느러미(Fin) 모양의 3D 입체 기둥으로 세우고, 게이트가 3면을 감싸 채널 제어력을 비약적으로 향상시켰습니다.'
  },
  {
    title: 'GAA Nano-sheet (Gate-All-Around)',
    era: '최선단 2nm 이하',
    icon: 'layers',
    badge: 'Next-Gen Logic',
    badgeColor: '#A855F7',
    desc: '채널을 얇은 나노시트(Nano-sheet) 형태로 여러 겹 띄우고 게이트가 채널의 4개 면 전체를 완벽하게 둘러싸서 전력 효율과 집적도를 극대화한 차세대 초미세 소자 구조입니다.'
  },
  {
    title: '321단 4D NAND Flash',
    era: 'SK hynix 세계 최초 300단 초과',
    icon: 'database',
    badge: 'Vertical 3D',
    badgeColor: '#F59E0B',
    desc: '평면 셀 미세화의 한계를 극복하고 셀을 수직으로 321층 이상 쌓아 올린 초고용량 낸드 플래시입니다. 본 매뉴얼의 고종횡비(HAR) 식각과 박막 증착의 정점이 적용됩니다.'
  },
  {
    title: 'HBM3E / HBM4 (초고대역폭 메모리)',
    era: 'AI 반도체의 핵심 심장',
    icon: 'cpu',
    badge: 'AI Flagship',
    badgeColor: '#ED1C24',
    desc: 'DRAM 다이를 수직으로 적층하고 수천 개의 TSV(실리콘 관통 전극)로 직결하여 초당 1TB 이상의 압도적 데이터 전송 대역폭을 제공하는 SK하이닉스의 글로벌 리더십 제품입니다.'
  }
];
