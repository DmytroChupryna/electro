/**
 * Seed Blog API Route
 * GET /api/seed-blog?secret=xxx - seeds 5 blog articles into posts collection
 *
 * Protected by secret key. Skips if posts already exist.
 */

import { getPayload } from 'payload';
import config from '@/payload.config';
import { NextResponse } from 'next/server';

// Lexical node helpers
const NODE_PROPS = { direction: 'ltr' as const, format: '', indent: 0, version: 1 };

function textNode(text: string, format = 0) {
  return format ? { type: 'text' as const, text, format } : { type: 'text' as const, text };
}

function paragraph(children: Array<{ type: 'text'; text: string; format?: number }>) {
  return { type: 'paragraph' as const, children, ...NODE_PROPS };
}

function heading(tag: 'h2' | 'h3', text: string) {
  return {
    type: 'heading' as const,
    tag,
    children: [textNode(text)],
    ...NODE_PROPS,
  };
}

function listItem(text: string) {
  return {
    type: 'listitem' as const,
    children: [textNode(text)],
    ...NODE_PROPS,
    value: 1,
  };
}

function bulletList(items: string[]) {
  return {
    type: 'list' as const,
    listType: 'bullet' as const,
    children: items.map(listItem),
    ...NODE_PROPS,
    start: 1,
    tag: 'ul' as const,
  };
}

function p(text: string, boldParts: Array<string> = []) {
  if (boldParts.length === 0) return paragraph([textNode(text)]);
  const parts: Array<{ type: 'text'; text: string; format?: number }> = [];
  let remaining = text;
  for (const bold of boldParts) {
    const idx = remaining.indexOf(bold);
    if (idx === -1) continue;
    if (idx > 0) parts.push(textNode(remaining.slice(0, idx)));
    parts.push(textNode(bold, 1));
    remaining = remaining.slice(idx + bold.length);
  }
  if (remaining) parts.push(textNode(remaining));
  return paragraph(parts);
}

function root(children: unknown[]) {
  return { root: { type: 'root' as const, children, ...NODE_PROPS } };
}

// Article 1: Cat6 vs Cat7
function contentArticle1En() {
  return root([
    heading('h2', 'Understanding Cat6 vs Cat7: Key Technical Differences'),
    paragraph([
      textNode('Choosing the right structured cabling for your LAN network is critical for performance, scalability, and long-term investment protection. '),
      textNode('Category 6 (Cat6) and Category 7 (Cat7) are two of the most commonly considered standards. This guide explains their differences, specifications, and when to use each.'),
    ]),
    heading('h2', 'Bandwidth and Speed Specifications'),
    paragraph([
      textNode('Cat6 cables support bandwidth up to '),
      textNode('250 MHz', 1),
      textNode(', delivering 1 Gbps at 100 meters and up to 10 Gbps at shorter distances (up to 55 meters). Cat6a extends this to 500 MHz and 10 Gbps at full 100m.'),
    ]),
    paragraph([
      textNode('Cat7 supports '),
      textNode('600 MHz', 1),
      textNode(' bandwidth and 10 Gbps at 100 meters consistently. Cat7a pushes to 1000 MHz for future 40 Gbps applications. For most office and industrial networks, Cat6 or Cat6a is sufficient.'),
    ]),
    heading('h2', 'Shielding: S/FTP and Performance'),
    paragraph([
      textNode('Cat6 is typically available in UTP (unshielded) or F/UTP (foil shielded). Cat7 uses '),
      textNode('S/FTP (shielded twisted pairs)', 1),
      textNode(' — each pair is individually shielded, plus an overall braid. This reduces crosstalk and EMI, making Cat7 ideal for data centers or electrically noisy environments.'),
    ]),
    heading('h2', 'When to Choose Cat6 or Cat6a'),
    paragraph([
      textNode('Cat6 is the cost-effective choice for offices, warehouses, and commercial buildings where 1–10 Gbps is sufficient. Cat6a is recommended when you need guaranteed 10 Gbps at full 100m or plan for higher speeds in the next decade. '),
      textNode('Future-proofing', 1),
      textNode(' often means Cat6a rather than jumping to Cat7.'),
    ]),
    heading('h2', 'When to Choose Cat7'),
    paragraph([
      textNode('Cat7 makes sense for data centers, industrial automation, and environments with high electromagnetic interference. It also future-proofs for 25G and 40G over copper. The trade-off is higher cost and more complex installation (proper grounding is essential).'),
    ]),
    heading('h2', 'Cost Considerations'),
    paragraph([
      textNode('Cat6 costs roughly 20–40% less than Cat7. Cat7 requires GG45 or TERA connectors (not standard RJ45), which increases installation and equipment costs. For typical business networks, Cat6a offers the best balance of performance and cost.'),
    ]),
    heading('h2', 'Recommendation Summary'),
    bulletList([
      'Use Cat6 for standard office LANs and budget-conscious projects.',
      'Choose Cat6a when you need 10 Gbps at 100m or want extra headroom.',
      'Select Cat7 for data centers, industrial sites, or high-EMI environments.',
      'Always use qualified installers — proper termination affects performance more than cable grade.',
    ]),
  ]);
}

function contentArticle1Pl() {
  return root([
    heading('h2', 'Cat6 vs Cat7 — różnice techniczne'),
    paragraph([
      textNode('Wybór właściwego okablowania strukturalnego dla sieci LAN ma kluczowe znaczenie dla wydajności i trwałości inwestycji. Kategoria 6 (Cat6) i Kategoria 7 (Cat7) to dwa najczęściej rozważane standardy. '),
      textNode('W tym przewodniku wyjaśniamy różnice, specyfikacje i kiedy stosować każdy z nich.'),
    ]),
    heading('h2', 'Przepustowość i prędkość'),
    paragraph([
      textNode('Kable Cat6 obsługują pasmo do '),
      textNode('250 MHz', 1),
      textNode(', zapewniając 1 Gbps na 100 m i do 10 Gbps na krótszych dystansach (do 55 m). Cat6a rozszerza to do 500 MHz i 10 Gbps na pełnych 100 m.'),
    ]),
    paragraph([
      textNode('Cat7 obsługuje '),
      textNode('600 MHz', 1),
      textNode(' pasma i stabilne 10 Gbps na 100 m. Cat7a sięga 1000 MHz dla przyszłych aplikacji 40 Gbps. Dla większości sieci biurowych i przemysłowych Cat6 lub Cat6a wystarczy.'),
    ]),
    heading('h2', 'Ekranowanie: S/FTP i wydajność'),
    paragraph([
      textNode('Cat6 występuje zwykle jako UTP (nieekranowany) lub F/UTP (z folią). Cat7 stosuje '),
      textNode('S/FTP (ekranowane pary skręcane)', 1),
      textNode(' — każda para jest ekranowana osobno, plus osłona zbiorcza. To zmniejsza przesłuch i EMI, co sprawia, że Cat7 jest idealny do centrów danych lub środowisk z dużym zakłóceniami.'),
    ]),
    heading('h2', 'Kiedy wybrać Cat6 lub Cat6a'),
    paragraph([
      textNode('Cat6 to ekonomiczny wybór dla biur, magazynów i budynków komercyjnych, gdzie 1–10 Gbps wystarcza. Cat6a jest zalecany, gdy potrzebujesz gwarantowanego 10 Gbps na 100 m lub planujesz wyższe prędkości. '),
      textNode('Przyszłościowe inwestycje', 1),
      textNode(' często oznaczają Cat6a zamiast skoku do Cat7.'),
    ]),
    heading('h2', 'Kiedy wybrać Cat7'),
    paragraph([
      textNode('Cat7 ma sens w centrach danych, automatyce przemysłowej i środowiskach o dużym EMI. Przyszłościowo wspiera także 25G i 40G po miedzi. Kompromis to wyższy koszt i bardziej złożona instalacja (właściwe uziemienie jest kluczowe).'),
    ]),
    heading('h2', 'Koszty'),
    paragraph([
      textNode('Cat6 kosztuje ok. 20–40% mniej niż Cat7. Cat7 wymaga złączy GG45 lub TERA (nie standardowe RJ45), co podnosi koszt instalacji. Dla typowych sieci biznesowych Cat6a oferuje najlepszy stosunek wydajności do ceny.'),
    ]),
    heading('h2', 'Podsumowanie'),
    bulletList([
      'Cat6 — standardowe sieci LAN, projekty z ograniczonym budżetem.',
      'Cat6a — 10 Gbps na 100 m, dodatkowy zapas na przyszłość.',
      'Cat7 — centra danych, obiekty przemysłowe, wysokie EMI.',
      'Zawsze korzystaj z wykwalifikowanych instalatorów — poprawa końcówka wpływa na wydajność bardziej niż klasa kabla.',
    ]),
  ]);
}

// Article 2: Electrical contractor
function contentArticle2En() {
  return root([
    heading('h2', 'How to Choose an Electrical Contractor: 7 Key Criteria'),
    paragraph([
      textNode('Selecting the right electrical contractor can make or break your project — whether it\'s a residential renovation, commercial build-out, or industrial installation. '),
      textNode('Here are seven essential criteria to evaluate before signing a contract.'),
    ]),
    heading('h2', '1. Certifications and Licenses'),
    paragraph([
      textNode('Verify that the contractor holds valid '),
      textNode('electrical licenses', 1),
      textNode(' and certifications required in your jurisdiction. In Belgium, look for contractors registered with the appropriate bodies; in Poland, check SEP (Stowarzyszenie Elektryków Polskich) qualifications and up-to-date permits.'),
    ]),
    heading('h2', '2. Insurance and Liability'),
    paragraph([
      textNode('A reputable contractor must have comprehensive liability insurance and workers\' compensation. Request proof of insurance and confirm coverage limits. Without proper insurance, you could be liable for on-site accidents or property damage.'),
    ]),
    heading('h2', '3. Experience and Specialization'),
    paragraph([
      textNode('Match the contractor\'s experience to your project type. Industrial projects require different expertise than residential work. Look for a track record in similar projects — warehouses, offices, automation systems, or photovoltaics — depending on your needs.'),
    ]),
    heading('h2', '4. References and Past Projects'),
    paragraph([
      textNode('Ask for references from recent clients and, if possible, visit completed projects. '),
      textNode('Word-of-mouth and portfolio reviews', 1),
      textNode(' provide insight into work quality, reliability, and communication. A contractor reluctant to share references is a red flag.'),
    ]),
    heading('h2', '5. Transparent Pricing'),
    paragraph([
      textNode('Request a detailed quote that breaks down labor, materials, and any contingencies. Beware of suspiciously low bids — they often lead to cost overruns or corner-cutting. A clear pricing structure indicates professionalism.'),
    ]),
    heading('h2', '6. Timeline and Availability'),
    paragraph([
      textNode('Discuss realistic timelines and availability. Electrical work often determines critical path on construction projects. Ensure the contractor can commit to your schedule and has the capacity to complete the work without excessive delays.'),
    ]),
    heading('h2', '7. Safety and Compliance'),
    paragraph([
      textNode('Safety should be non-negotiable. Inquire about safety protocols, PPE, and compliance with local regulations (e.g. VCA in Belgium). Contractors who prioritize safety typically deliver higher quality and fewer issues on site.'),
    ]),
    heading('h2', 'Summary'),
    bulletList([
      'Verify licenses and certifications (SEP, Belgian regulations).',
      'Confirm insurance and liability coverage.',
      'Check experience in your project type.',
      'Request references and visit past projects.',
      'Obtain transparent, detailed quotes.',
      'Align on timelines and capacity.',
      'Prioritize safety and compliance.',
    ]),
  ]);
}

function contentArticle2Pl() {
  return root([
    heading('h2', 'Jak wybrać wykonawcę elektrycznego: 7 kluczowych kryteriów'),
    paragraph([
      textNode('Wybór właściwego wykonawcy elektrycznego może zadecydować o sukcesie lub porażce projektu — czy to remont mieszkania, budowa komercyjna czy instalacja przemysłowa. '),
      textNode('Oto siedem kryteriów, które warto ocenić przed podpisaniem umowy.'),
    ]),
    heading('h2', '1. Certyfikaty i uprawnienia'),
    paragraph([
      textNode('Sprawdź, czy wykonawca posiada ważne '),
      textNode('uprawnienia elektryczne', 1),
      textNode(' i certyfikaty wymagane w Twojej jurysdykcji. W Belgii szukaj firm zarejestrowanych w odpowiednich organach; w Polsce sprawdź kwalifikacje SEP i aktualne pozwolenia.'),
    ]),
    heading('h2', '2. Ubezpieczenie i odpowiedzialność'),
    paragraph([
      textNode('Rzetelny wykonawca musi mieć ubezpieczenie od odpowiedzialności cywilnej i NNW. Poproś o zaświadczenie i potwierdź sumy gwarancyjne. Bez właściwego ubezpieczenia możesz ponosić odpowiedzialność za wypadki na budowie.'),
    ]),
    heading('h2', '3. Doświadczenie i specjalizacja'),
    paragraph([
      textNode('Dopasuj doświadczenie wykonawcy do typu projektu. Projekty przemysłowe wymagają innej wiedzy niż prace mieszkaniowe. Szukaj realizacji w podobnych projektach — magazyny, biura, automatyka, fotowoltaika — w zależności od potrzeb.'),
    ]),
    heading('h2', '4. Referencje i zrealizowane projekty'),
    paragraph([
      textNode('Poproś o referencje od ostatnich klientów i jeśli możliwe — odwiedź zrealizowane obiekty. '),
      textNode('Opinie i portfolio', 1),
      textNode(' dają wgląd w jakość, rzetelność i komunikację. Wykonawca niechętny do udostępnienia referencji to sygnał ostrzegawczy.'),
    ]),
    heading('h2', '5. Przejrzysta wycena'),
    paragraph([
      textNode('Poproś o szczegółową ofertę z podziałem na robociznę, materiały i ewentualne ryzyka. Uważaj na podejrzanie niskie oferty — często prowadzą do przekroczeń kosztów. Przejrzysta struktura cen świadczy o profesjonalizmie.'),
    ]),
    heading('h2', '6. Terminy i dostępność'),
    paragraph([
      textNode('Omów realistyczne harmonogramy i dostępność. Prace elektryczne często decydują o ścieżce krytycznej projektu. Upewnij się, że wykonawca może zobowiązać się do Twojego harmonogramu.'),
    ]),
    heading('h2', '7. Bezpieczeństwo i zgodność'),
    paragraph([
      textNode('Bezpieczeństwo musi być nie do negocjacji. Dopytaj o protokoły BHP, środki ochrony i zgodność z przepisami (np. VCA w Belgii). Wykonawcy dbający o BHP zwykle dostarczają lepszą jakość.'),
    ]),
    heading('h2', 'Podsumowanie'),
    bulletList([
      'Sprawdź uprawnienia i certyfikaty (SEP, przepisy belgijskie).',
      'Potwierdź ubezpieczenie i zakres odpowiedzialności.',
      'Zweryfikuj doświadczenie w Twoim typie projektu.',
      'Poproś o referencje i odwiedź realizacje.',
      'Uzyskaj przejrzystą, szczegółową ofertę.',
      'Uzgodnij terminy i moce przerobowe.',
      'Priorytet: bezpieczeństwo i zgodność.',
    ]),
  ]);
}

// Article 3: KNX
function contentArticle3En() {
  return root([
    heading('h2', 'KNX Systems: What Is Intelligent Building Automation?'),
    paragraph([
      textNode('KNX is the leading open standard for building automation, unifying control of lighting, HVAC, security, and more into a single, interoperable system. '),
      textNode('Understanding KNX helps investors and facility managers make informed decisions about smart building projects.'),
    ]),
    heading('h2', 'What Is KNX?'),
    paragraph([
      textNode('KNX is an '),
      textNode('international standard', 1),
      textNode(' (ISO/IEC 14543-3) for home and building automation. It enables devices from different manufacturers to communicate over a common bus — typically a twisted-pair cable (KNX TP) or Powerline (KNX PL). Sensors, actuators, and controllers exchange data without a central computer for basic operations.'),
    ]),
    heading('h2', 'How KNX Works'),
    paragraph([
      textNode('KNX uses a decentralized, event-driven architecture. Each device (e.g. switch, dimmer, thermostat) can send and receive group telegrams. When you press a switch, it broadcasts a command; all devices configured to react to that address respond. No single point of failure — the system keeps running even if one device fails.'),
    ]),
    heading('h2', 'Benefits for Residential and Commercial Buildings'),
    paragraph([
      textNode('Energy savings through smart lighting and HVAC control; enhanced comfort with scenes and schedules; improved security via integrated access and alarm; scalability — add devices over time without replacing the whole system; and vendor independence thanks to the open standard.'),
    ]),
    heading('h2', 'Typical Applications'),
    bulletList([
      'Lighting control: on/off, dimming, presence detection, daylight harvesting.',
      'HVAC: thermostats, zone control, integration with heat pumps.',
      'Blinds and shutters: sun tracking, privacy, energy management.',
      'Security: access control, intrusion detection, video intercom.',
      'Monitoring: energy meters, leak detection, maintenance alerts.',
    ]),
    heading('h2', 'Planning and Installation'),
    paragraph([
      textNode('KNX installation should be planned during the design phase. The bus cabling runs alongside power lines; devices connect via bus couplers. '),
      textNode('Certified KNX installers', 1),
      textNode(' ensure proper configuration using ETS (Engineering Tool Software) for programming. Integration with BMS or cloud platforms is possible via gateways.'),
    ]),
  ]);
}

function contentArticle3Pl() {
  return root([
    heading('h2', 'Systemy KNX — czym jest inteligentna automatyka budynkowa?'),
    paragraph([
      textNode('KNX to wiodący otwarty standard automatyki budynkowej, łączący sterowanie oświetleniem, HVAC, bezpieczeństwem i innymi funkcjami w jeden, interoperacyjny system. '),
      textNode('Zrozumienie KNX pomaga inwestorom i zarządcom obiektów w podejmowaniu świadomych decyzji o projektach inteligentnych budynków.'),
    ]),
    heading('h2', 'Czym jest KNX?'),
    paragraph([
      textNode('KNX to '),
      textNode('międzynarodowy standard', 1),
      textNode(' (ISO/IEC 14543-3) automatyki domowej i budynkowej. Umożliwia komunikację urządzeń różnych producentów po wspólnej szynie — zwykle kablu skręcanym (KNX TP) lub Powerline (KNX PL). Czujniki, siłowniki i kontrolery wymieniają dane bez centralnego komputera.'),
    ]),
    heading('h2', 'Jak działa KNX'),
    paragraph([
      textNode('KNX wykorzystuje zdecentralizowaną, opartą na zdarzeniach architekturę. Każde urządzenie (np. łącznik, ściemniacz, termostat) może wysyłać i odbierać telegramy grupowe. Naciśnięcie przycisku wysyła komendę; wszystkie urządzenia skonfigurowane do reakcji odpowiedzą. Brak pojedynczego punktu awarii — system działa nawet przy awarii jednego urządzenia.'),
    ]),
    heading('h2', 'Korzyści dla budynków mieszkalnych i komercyjnych'),
    paragraph([
      textNode('Oszczędność energii dzięki inteligentnemu oświetleniu i HVAC; większy komfort dzięki scenom i harmonogramom; lepsze bezpieczeństwo przez zintegrowany dostęp i alarm; skalowalność — dodawanie urządzeń w czasie bez wymiany całego systemu; niezależność od dostawcy dzięki otwartemu standardowi.'),
    ]),
    heading('h2', 'Typowe zastosowania'),
    bulletList([
      'Sterowanie oświetleniem: włączanie, ściemnianie, detekcja obecności.',
      'HVAC: termostaty, sterowanie strefami, integracja z pompami ciepła.',
      'Rolety i żaluzje: śledzenie słońca, prywatność, zarządzanie energią.',
      'Bezpieczeństwo: kontrola dostępu, detekcja wtargnięcia, wideodomofon.',
      'Monitorowanie: liczniki energii, detekcja wycieków, alerty serwisowe.',
    ]),
    heading('h2', 'Planowanie i instalacja'),
    paragraph([
      textNode('Instalację KNX należy zaplanować na etapie projektowania. Okablowanie magistrali biegnie obok przewodów zasilających; urządzenia łączą się przez złącza magistrali. '),
      textNode('Certyfikowani instalatorzy KNX', 1),
      textNode(' zapewniają poprawną konfigurację przy użyciu ETS. Integracja z BMS lub chmurą jest możliwa przez bramy.'),
    ]),
  ]);
}

// Article 4: VCA
function contentArticle4En() {
  return root([
    heading('h2', 'VCA Certification: Why It Matters on Construction Sites'),
    paragraph([
      textNode('VCA (Veiligheid, Gezondheid en Milieu Checklist Aannemers) is a Dutch-Belgian safety certification that has become a prerequisite for many construction and industrial projects. '),
      textNode('Understanding VCA helps contractors and clients ensure compliance and reduce risk.'),
    ]),
    heading('h2', 'What Is VCA?'),
    paragraph([
      textNode('VCA is a '),
      textNode('safety management system', 1),
      textNode(' that certifies a company\'s ability to manage health, safety, and environmental risks. There are two levels: VCA** (basic) and VCA* (more stringent, for higher-risk activities). The certification is valid for three years, subject to audits.'),
    ]),
    heading('h2', 'Why VCA Is Important'),
    paragraph([
      textNode('Many principal contractors, especially in Belgium and the Netherlands, require VCA from subcontractors. Without it, your company may be excluded from tender processes. VCA demonstrates commitment to worker safety, reduces accident rates, and helps with insurance and legal compliance.'),
    ]),
    heading('h2', 'Legal and Market Requirements'),
    paragraph([
      textNode('In Belgium, certain sectors (petrochemical, nuclear, large infrastructure) mandate VCA or equivalent. In Poland, while VCA is not legally required, international clients and joint ventures often demand it. Having VCA opens doors to cross-border projects.'),
    ]),
    heading('h2', 'What VCA Audits Cover'),
    bulletList([
      'Safety policy and management structure.',
      'Risk assessments and safe work procedures.',
      'Training and competence of personnel.',
      'PPE and equipment maintenance.',
      'Incident reporting and corrective actions.',
      'Environmental management (for VCA*).',
    ]),
    heading('h2', 'Summary'),
    paragraph([
      textNode('VCA is increasingly a market expectation for electrical contractors working in Belgium and on international projects. Obtaining and maintaining certification shows professionalism and improves competitiveness. Plan certification in advance — the audit and preparation process takes time.'),
    ]),
  ]);
}

function contentArticle4Pl() {
  return root([
    heading('h2', 'Certyfikat VCA — dlaczego jest ważny na budowie?'),
    paragraph([
      textNode('VCA (Veiligheid, Gezondheid en Milieu Checklist Aannemers) to holendersko-belgijski certyfikat bezpieczeństwa, który stał się wymogiem w wielu projektach budowlanych i przemysłowych. '),
      textNode('Zrozumienie VCA pomaga wykonawcom i zleceniodawcom zapewnić zgodność i ograniczyć ryzyko.'),
    ]),
    heading('h2', 'Czym jest VCA?'),
    paragraph([
      textNode('VCA to '),
      textNode('system zarządzania bezpieczeństwem', 1),
      textNode(', który certyfikuje zdolność firmy do zarządzania ryzykiem BHP i środowiskowym. Są dwa poziomy: VCA** (podstawowy) i VCA* (bardziej rygorystyczny). Certyfikat jest ważny 3 lata, z audytami.'),
    ]),
    heading('h2', 'Dlaczego VCA jest ważne'),
    paragraph([
      textNode('Wielu generalnych wykonawców w Belgii i Holandii wymaga VCA od podwykonawców. Bez certyfikatu firma może być wykluczona z przetargów. VCA pokazuje zaangażowanie w bezpieczeństwo, redukuje wypadkowość i ułatwia zgodność z ubezpieczeniami i prawem.'),
    ]),
    heading('h2', 'Wymagania prawne i rynkowe'),
    paragraph([
      textNode('W Belgii niektóre sektory (petrochemia, energetyka jądrowa, duża infrastruktura) wymagają VCA lub ekwiwalentu. W Polsce VCA nie jest prawnie wymagane, ale międzynarodowi klienci często go żądają. Posiadanie VCA otwiera drzwi do projektów transgranicznych.'),
    ]),
    heading('h2', 'Zakres audytów VCA'),
    bulletList([
      'Polityka bezpieczeństwa i struktura zarządzania.',
      'Oceny ryzyka i procedury bezpiecznej pracy.',
      'Szkolenia i kompetencje personelu.',
      'Środki ochrony indywidualnej i konserwacja sprzętu.',
      'Raportowanie incydentów i działania naprawcze.',
      'Zarządzanie środowiskowe (VCA*).',
    ]),
    heading('h2', 'Podsumowanie'),
    paragraph([
      textNode('VCA staje się oczekiwaniem rynkowym dla wykonawców elektrycznych w Belgii i na projektach międzynarodowych. Uzyskanie i utrzymanie certyfikatu świadczy o profesjonalizmie i poprawia konkurencyjność. Planuj certyfikację z wyprzedzeniem — audyt i przygotowanie wymagają czasu.'),
    ]),
  ]);
}

// Article 5: Low-current
function contentArticle5En() {
  return root([
    heading('h2', 'Low-Current Systems: Complete Guide for Investors'),
    paragraph([
      textNode('Low-current (low-voltage) systems form the backbone of modern buildings — security, communication, and automation. '),
      textNode('This guide helps investors and developers plan and budget for these essential installations.'),
    ]),
    heading('h2', 'Types of Low-Current Systems'),
    paragraph([
      textNode('Low-current systems operate at safe voltages (typically 12–48V or data-level signals) and include: '),
      textNode('CCTV and video surveillance', 1),
      textNode(', access control, fire alarm and evacuation systems, building management systems (BMS), structured cabling (LAN, phone, IP), intercom and video entry, and public address systems.'),
    ]),
    heading('h2', 'CCTV and Access Control'),
    paragraph([
      textNode('CCTV systems provide surveillance for security and operational oversight. IP cameras connect over the LAN; analog cameras require separate cabling. Access control (badges, biometrics, turnstiles) integrates with CCTV and HR systems. Plan camera positions and cable routes during design.'),
    ]),
    heading('h2', 'Fire Alarm and BMS'),
    paragraph([
      textNode('Fire alarm systems are legally mandated in most buildings. They must meet local norms (e.g. Polish PN-EN, Belgian NBN). BMS integrates HVAC, lighting, and alarms for centralized control and energy optimization. Early integration saves cost and improves performance.'),
    ]),
    heading('h2', 'Structured Cabling'),
    paragraph([
      textNode('Structured cabling (Cat6/Cat6a/Cat7) supports data, voice, and often PoE for cameras and access devices. Plan cable trays, patch panels, and backbone routing. Oversizing slightly (e.g. extra conduits) simplifies future expansion.'),
    ]),
    heading('h2', 'Planning and Cost Considerations'),
    bulletList([
      'Involve specialists at the design stage — retrofits cost more.',
      'Bundle systems where possible (single cable tray, shared backbone).',
      'Specify quality equipment — cheap cameras and cabling cause ongoing issues.',
      'Budget for maintenance and software licenses (VMS, BMS).',
    ]),
    heading('h2', 'Summary'),
    paragraph([
      textNode('Low-current systems are a critical investment that affects safety, efficiency, and tenant satisfaction. Work with experienced contractors who can design, install, and maintain all subsystems. Techno Groop delivers integrated low-current solutions for commercial and industrial projects in Poland and Belgium.'),
    ]),
  ]);
}

function contentArticle5Pl() {
  return root([
    heading('h2', 'Systemy niskoprądowe — kompletny przewodnik dla inwestorów'),
    paragraph([
      textNode('Systemy niskoprądowe stanowią fundament nowoczesnych budynków — bezpieczeństwo, komunikacja i automatyka. '),
      textNode('Ten przewodnik pomaga inwestorom i deweloperom planować i budżetować te niezbędne instalacje.'),
    ]),
    heading('h2', 'Rodzaje systemów niskoprądowych'),
    paragraph([
      textNode('Systemy niskoprądowe działają przy napięciach bezpiecznych (zwykle 12–48V) i obejmują: '),
      textNode('CCTV i monitoring wizyjny', 1),
      textNode(', kontrolę dostępu, systemy sygnalizacji pożaru i ewakuacji, systemy BMS, okablowanie strukturalne (LAN, telefon, IP), domofon i wideodomofon oraz nagłośnienie.'),
    ]),
    heading('h2', 'CCTV i kontrola dostępu'),
    paragraph([
      textNode('Systemy CCTV zapewniają monitoring do celów bezpieczeństwa i operacyjnych. Kamery IP łączą się po sieci LAN; kamery analogowe wymagają osobnego okablowania. Kontrola dostępu (karty, biometria, bramki) integruje się z CCTV i HR. Planuj lokalizacje kamer na etapie projektu.'),
    ]),
    heading('h2', 'Sygnalizacja pożarowa i BMS'),
    paragraph([
      textNode('Systemy sygnalizacji pożaru są prawnie wymagane w większości budynków. Muszą spełniać lokalne normy (np. PN-EN w Polsce, NBN w Belgii). BMS integruje HVAC, oświetlenie i alarmy dla scentralizowanego sterowania. Wczesna integracja oszczędza koszty.'),
    ]),
    heading('h2', 'Okablowanie strukturalne'),
    paragraph([
      textNode('Okablowanie strukturalne (Cat6/Cat6a/Cat7) obsługuje dane, głos i często PoE dla kamer. Planuj korytka, panele krosowe i trasy magistrali. Lekkie przewymiarowanie (np. dodatkowe puszki) ułatwia przyszłą rozbudowę.'),
    ]),
    heading('h2', 'Planowanie i koszty'),
    bulletList([
      'Zaangażuj specjalistów na etapie projektu — późniejsze przebudowy kosztują więcej.',
      'Grupuj systemy tam, gdzie to możliwe (wspólne korytka, magistrala).',
      'Specyfikuj jakościowy sprzęt — tanie kamery generują problemy.',
      'Budżetuj konserwację i licencje (VMS, BMS).',
    ]),
    heading('h2', 'Podsumowanie'),
    paragraph([
      textNode('Systemy niskoprądowe to kluczowa inwestycja wpływająca na bezpieczeństwo, efektywność i satysfakcję najemców. Współpracuj z doświadczonymi wykonawcami oferującymi projektowanie, montaż i serwis. Techno Groop realizuje zintegrowane rozwiązania niskoprądowe dla projektów komercyjnych i przemysłowych w Polsce i Belgii.'),
    ]),
  ]);
}

const articles = [
  {
    slug: 'okablowanie-strukturalne-cat6-cat7',
    category: 'guides' as const,
    titleEn: 'Structured Cabling Cat6 vs Cat7 — Which to Choose?',
    titlePl: 'Okablowanie strukturalne Cat6 vs Cat7 — co wybrać?',
    tagsEn: [{ tag: 'structured cabling' }, { tag: 'cat6' }, { tag: 'cat7' }, { tag: 'LAN networks' }],
    tagsPl: [{ tag: 'okablowanie strukturalne' }, { tag: 'cat6' }, { tag: 'cat7' }, { tag: 'sieci LAN' }],
    excerptEn: 'A practical guide to choosing between Cat6 and Cat7 structured cabling: specifications, shielding, cost, and when to use each.',
    excerptPl: 'Praktyczny przewodnik po wyborze okablowania Cat6 i Cat7: specyfikacje, ekranowanie, koszty i zastosowania.',
    contentEn: contentArticle1En,
    contentPl: contentArticle1Pl,
    publishedAt: '2026-02-01',
  },
  {
    slug: 'jak-wybrac-wykonawce-elektrycznego',
    category: 'guides' as const,
    titleEn: 'How to Choose an Electrical Contractor? 7 Key Criteria',
    titlePl: 'Jak wybrać wykonawcę elektrycznego? 7 kluczowych kryteriów',
    tagsEn: [{ tag: 'electrical contractor' }, { tag: 'electrician' }, { tag: 'how to choose' }],
    tagsPl: [{ tag: 'wykonawca elektryczny' }, { tag: 'elektryk' }, { tag: 'jak wybrać' }],
    excerptEn: 'Seven essential criteria for selecting a reliable electrical contractor: certifications, insurance, experience, references, and more.',
    excerptPl: 'Siedem kryteriów przy wyborze wykonawcy elektrycznego: certyfikaty, ubezpieczenie, doświadczenie, referencje i inne.',
    contentEn: contentArticle2En,
    contentPl: contentArticle2Pl,
    publishedAt: '2026-02-05',
  },
  {
    slug: 'systemy-knx-inteligentny-dom',
    category: 'guides' as const,
    titleEn: 'KNX Systems — What is Intelligent Building Automation?',
    titlePl: 'Systemy KNX — czym jest inteligentna automatyka budynkowa?',
    tagsEn: [{ tag: 'KNX' }, { tag: 'building automation' }, { tag: 'smart home' }],
    tagsPl: [{ tag: 'KNX' }, { tag: 'automatyka budynkowa' }, { tag: 'inteligentny dom' }, { tag: 'smart home' }],
    excerptEn: 'Introduction to KNX: the open standard for building automation, how it works, benefits, and typical applications.',
    excerptPl: 'Wprowadzenie do KNX: otwarty standard automatyki budynkowej, zasada działania, korzyści i zastosowania.',
    contentEn: contentArticle3En,
    contentPl: contentArticle3Pl,
    publishedAt: '2026-02-10',
  },
  {
    slug: 'certyfikat-vca-bezpieczenstwo',
    category: 'news' as const,
    titleEn: 'VCA Certification — Why Is It Important on Construction Sites?',
    titlePl: 'Certyfikat VCA — dlaczego jest ważny na budowie?',
    tagsEn: [{ tag: 'VCA' }, { tag: 'safety' }, { tag: 'certification' }, { tag: 'OSH' }],
    tagsPl: [{ tag: 'VCA' }, { tag: 'bezpieczeństwo' }, { tag: 'certyfikat' }, { tag: 'BHP' }],
    excerptEn: 'VCA safety certification: what it is, why it matters for contractors, and legal requirements in Belgium and Poland.',
    excerptPl: 'Certyfikat VCA: czym jest, dlaczego ma znaczenie dla wykonawców i wymagania prawne w Belgii i Polsce.',
    contentEn: contentArticle4En,
    contentPl: contentArticle4Pl,
    publishedAt: '2026-02-15',
  },
  {
    slug: 'instalacje-niskopadowe-przewodnik',
    category: 'tips' as const,
    titleEn: 'Low-Current Systems — Complete Guide for Investors',
    titlePl: 'Systemy niskoprądowe — kompletny przewodnik dla inwestorów',
    tagsEn: [{ tag: 'low-current systems' }, { tag: 'CCTV' }, { tag: 'access control' }],
    tagsPl: [{ tag: 'systemy niskoprądowe' }, { tag: 'instalacje niskoprądowe' }, { tag: 'CCTV' }, { tag: 'kontrola dostępu' }],
    excerptEn: 'Overview of low-current systems: CCTV, access control, fire alarm, BMS, structured cabling. Planning and cost considerations.',
    excerptPl: 'Przegląd systemów niskoprądowych: CCTV, kontrola dostępu, sygnalizacja pożaru, BMS, okablowanie. Planowanie i koszty.',
    contentEn: contentArticle5En,
    contentPl: contentArticle5Pl,
    publishedAt: '2026-02-20',
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  const validSecrets = ['technogroop-seed-2024', process.env.PAYLOAD_SECRET];
  if (!validSecrets.includes(secret || '')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const results: string[] = [];

    const existingPosts = await payload.find({ collection: 'posts', limit: 1 });
    if (existingPosts.totalDocs > 0) {
      return NextResponse.json({
        success: true,
        message: 'Posts already exist. Skipping seed to avoid duplicates.',
        results: [`Skipped (${existingPosts.totalDocs}+ posts found)`],
      });
    }

    for (const article of articles) {
      const post = await payload.create({
        collection: 'posts',
        data: {
          title: article.titleEn,
          slug: article.slug,
          excerpt: article.excerptEn,
          content: article.contentEn(),
          category: article.category,
          tags: article.tagsEn,
          author: 'Techno Groop',
          publishedAt: article.publishedAt,
          isPublished: true,
          coverImage: null,
          sortOrder: 0,
        },
        locale: 'en',
      });

      await payload.update({
        collection: 'posts',
        id: post.id,
        data: {
          title: article.titlePl,
          excerpt: article.excerptPl,
          content: article.contentPl(),
          tags: article.tagsPl,
        },
        locale: 'pl',
      });

      results.push(`Created post: ${article.titleEn}`);
    }

    return NextResponse.json({
      success: true,
      message: 'Blog seed completed successfully',
      results,
    });
  } catch (error) {
    console.error('Seed blog error:', error);
    return NextResponse.json(
      { error: 'Seed blog failed', details: String(error) },
      { status: 500 }
    );
  }
}
