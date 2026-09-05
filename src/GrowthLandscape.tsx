const rootNodes = [
  [120, 690], [235, 744], [340, 662], [470, 786], [585, 710], [705, 760],
  [825, 676], [955, 786], [1080, 708], [1215, 752], [1340, 668], [1475, 736],
]

function RootNetwork() {
  return (
    <svg className="root-network" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <filter id="softGlow"><feGaussianBlur stdDeviation="3" /></filter>
      </defs>
      <g className="root-lines">
        <path d="M72 748 C240 650 300 822 470 720 S760 680 900 760 S1190 820 1528 676" />
        <path d="M110 640 C270 780 410 604 610 734 S940 618 1120 758 S1380 698 1550 786" />
        <path d="M230 594 C340 676 410 694 540 628 S760 592 890 692 S1120 634 1300 720" />
        <path d="M360 852 C530 702 690 814 840 724 S1110 816 1270 650 S1430 652 1550 620" />
      </g>
      <g className="root-lines root-lines--glow" filter="url(#softGlow)">
        <path d="M72 748 C240 650 300 822 470 720 S760 680 900 760 S1190 820 1528 676" />
        <path d="M110 640 C270 780 410 604 610 734 S940 618 1120 758 S1380 698 1550 786" />
      </g>
      <g className="root-stems">
        <path d="M260 550 C276 590 242 644 235 744" />
        <path d="M500 550 C520 612 486 680 470 786" />
        <path d="M735 550 C748 620 718 690 705 760" />
        <path d="M1005 550 C1008 632 976 704 955 786" />
        <path d="M1290 550 C1285 610 1320 642 1340 668" />
      </g>
      {rootNodes.map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`} className={`root-node root-node--${index % 3}`}>
          <circle cx={cx} cy={cy} r="8" />
          <circle cx={cx} cy={cy} r="18" className="root-node-ring" />
        </g>
      ))}
    </svg>
  )
}

function Sprout({ left, scale = 1, fruit = false }: { left: string; scale?: number; fruit?: boolean }) {
  return (
    <div className="organism sprout" style={{ left, transform: `translateX(-50%) scale(${scale})` }}>
      <i className="stem" />
      <i className="leaf leaf--left" />
      <i className="leaf leaf--right" />
      {fruit && <i className="tiny-fruit" />}
    </div>
  )
}

function MushroomCluster({ left }: { left: string }) {
  return (
    <div className="organism mushroom-cluster" style={{ left }}>
      <i className="mushroom mushroom--a"><b /></i>
      <i className="mushroom mushroom--b"><b /></i>
      <i className="mushroom mushroom--c"><b /></i>
    </div>
  )
}

function FruitPlant({ left }: { left: string }) {
  return (
    <div className="organism fruit-plant" style={{ left }}>
      <i className="plant-stem" />
      <i className="branch branch--1" /><i className="branch branch--2" /><i className="branch branch--3" />
      <i className="plant-leaf plant-leaf--1" /><i className="plant-leaf plant-leaf--2" />
      <i className="plant-leaf plant-leaf--3" /><i className="plant-leaf plant-leaf--4" />
      <i className="berry berry--1" /><i className="berry berry--2" /><i className="berry berry--3" />
      <i className="flower flower--1" /><i className="flower flower--2" />
    </div>
  )
}

function SeedBurst() {
  return (
    <div className="seed-burst" aria-hidden="true">
      <i /><i /><i /><i /><i /><i /><i />
    </div>
  )
}

export function GrowthLandscape() {
  return (
    <main className="garden-shell">
      <header className="garden-topbar">
        <div className="garden-brand">
          <span className="garden-mark"><i /><i /><i /></span>
          <div><strong>Semantic Growth Landscape</strong><small>public concept preview</small></div>
        </div>
        <div className="garden-status"><span /> living system · visual experiment</div>
      </header>

      <section className="garden-stage" aria-label="Органическая визуализация развития системы">
        <div className="sky-layer">
          <div className="sun" />
          <div className="cloud cloud--one" /><div className="cloud cloud--two" />
          <div className="mountain mountain--back" />
          <div className="mountain mountain--mid" />
          <div className="mountain mountain--front" />
          <div className="lake" />
        </div>

        <div className="surface-glow" />
        <div className="soil-layer">
          <div className="soil-grain" />
          <div className="underground-aura underground-aura--a" />
          <div className="underground-aura underground-aura--b" />
          <RootNetwork />
          <div className="seed seed--one" /><div className="seed seed--two" />
        </div>

        <div className="surface-life">
          <MushroomCluster left="11%" />
          <Sprout left="27%" scale={0.78} />
          <Sprout left="42%" scale={1.08} fruit />
          <FruitPlant left="64%" />
          <Sprout left="82%" scale={1.38} fruit />
          <SeedBurst />
        </div>

        <div className="garden-caption">
          <span>ROOTS → EMERGENCE → FRUITING → NEW GROWTH</span>
          <strong>Work becoming visible</strong>
          <p>Abstract public view. No project names, internal topology or implementation details.</p>
        </div>

        <div className="stage-pulse stage-pulse--one" />
        <div className="stage-pulse stage-pulse--two" />
        <div className="stage-pulse stage-pulse--three" />
      </section>
    </main>
  )
}
