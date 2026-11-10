// Alt innhold i appen. Rediger her for å legge til områder, tiltak og kurs.

export const AREAS = [
  {
    id: 'sovn',
    name: 'Søvn og døgnrytme',
    emoji: '🌙',
    question: 'Hvor fornøyd er du med søvnen og døgnrytmen din akkurat nå?',
    signs: [
      { id: 'sovn-ulik', text: 'Jeg legger meg og står opp til veldig ulike tider', tiltak: ['fast-vekketid', 'leggealarm'] },
      { id: 'sovn-sovne', text: 'Jeg bruker lang tid på å sovne', tiltak: ['skjermfri-kveld', 'tankedump'] },
      { id: 'sovn-trott', text: 'Jeg er trøtt og tung om morgenen', tiltak: ['morgenlys', 'fast-vekketid'] },
      { id: 'sovn-grubler', text: 'Jeg våkner om natten og grubler', tiltak: ['tankedump', 'pust-478'] },
    ],
    kurs: ['dognrytme'],
  },
  {
    id: 'mental',
    name: 'Humør og mental helse',
    emoji: '🧠',
    question: 'Hvordan har du det med deg selv og humøret ditt for tiden?',
    signs: [
      { id: 'mental-nedfor', text: 'Jeg føler meg nedfor eller tom', tiltak: ['solvandring', 'tre-gode-ting', 'ring-venn'] },
      { id: 'mental-bekymrer', text: 'Jeg bekymrer meg mye', tiltak: ['bekymringstid', 'boks-pust'] },
      { id: 'mental-hard', text: 'Jeg er hard mot meg selv', tiltak: ['venne-stemmen', 'tre-gode-ting'] },
      { id: 'mental-krise', text: 'Jeg har tanker om at jeg ikke orker mer', tiltak: ['snakk-med-noen'], crisis: true },
    ],
    kurs: [],
  },
  {
    id: 'kropp',
    name: 'Fysisk aktivitet',
    emoji: '🏃',
    question: 'Hvor fornøyd er du med hvor mye du beveger deg?',
    signs: [
      { id: 'kropp-sitter', text: 'Jeg sitter stille det meste av dagen', tiltak: ['reis-deg', 'solvandring'] },
      { id: 'kropp-start', text: 'Jeg vet ikke hvor jeg skal begynne', tiltak: ['mikrookt', 'solvandring'] },
      { id: 'kropp-motivasjon', text: 'Jeg mangler motivasjon til å trene', tiltak: ['treningsavtale', 'mikrookt'] },
    ],
    kurs: [],
  },
  {
    id: 'kosthold',
    name: 'Kosthold og energi',
    emoji: '🥗',
    question: 'Hvor fornøyd er du med hva du spiser og energinivået ditt?',
    signs: [
      { id: 'kost-hopper', text: 'Jeg hopper over måltider', tiltak: ['enkel-frokost', 'middagsplan'] },
      { id: 'kost-sliten', text: 'Jeg blir sliten og ukonsentrert utover dagen', tiltak: ['vann-forst', 'enkel-frokost'] },
      { id: 'kost-kveld', text: 'Jeg småspiser mye om kvelden', tiltak: ['middagsplan', 'mer-gront'] },
    ],
    kurs: [],
  },
  {
    id: 'relasjoner',
    name: 'Relasjoner og nettverk',
    emoji: '🤝',
    question: 'Hvor fornøyd er du med kontakten du har med andre mennesker?',
    signs: [
      { id: 'rel-lite', text: 'Jeg har lite kontakt med venner og familie', tiltak: ['ring-venn', 'fast-avtale'] },
      { id: 'rel-nye', text: 'Jeg synes det er vanskelig å prate med nye folk', tiltak: ['hils-pa-en'] },
      { id: 'rel-ensom', text: 'Jeg føler meg ensom, selv blant folk', tiltak: ['takkemelding', 'ring-venn'] },
    ],
    kurs: ['smalltalk'],
  },
  {
    id: 'grenser',
    name: 'Stress og grenser',
    emoji: '🛡️',
    question: 'Hvor godt klarer du å holde stresset på et greit nivå?',
    signs: [
      { id: 'grense-ja', text: 'Jeg sier ja til ting jeg egentlig ikke vil', tiltak: ['pause-svar'] },
      { id: 'grense-mye', text: 'Jeg har altfor mye å gjøre', tiltak: ['tre-viktigste', 'boks-pust'] },
      { id: 'grense-av', text: 'Jeg klarer ikke å koble av', tiltak: ['avslutningsritual', 'varslingsfri'] },
    ],
    kurs: ['si-nei'],
  },
  {
    id: 'mestring',
    name: 'Jobb, skole og mestring',
    emoji: '🎯',
    question: 'Hvor fornøyd er du med hvordan det går på jobb, skole eller med det du jobber mot?',
    signs: [
      { id: 'mest-utsetter', text: 'Jeg utsetter ting', tiltak: ['to-minutter', 'fokusokt'] },
      { id: 'mest-utvikling', text: 'Jeg føler at jeg står stille', tiltak: ['ovelse-daglig'] },
      { id: 'mest-oversikt', text: 'Jeg mister oversikten', tiltak: ['ukeplan', 'tre-viktigste'] },
    ],
    kurs: [],
  },
  {
    id: 'glede',
    name: 'Glede og mening',
    emoji: '✨',
    question: 'Hvor mye glede og mening opplever du i hverdagen?',
    signs: [
      { id: 'glede-like', text: 'Dagene føles like', tiltak: ['noe-nytt', 'natur'] },
      { id: 'glede-tid', text: 'Jeg har ikke tid til ting jeg liker', tiltak: ['gledesliste'] },
      { id: 'glede-mening', text: 'Jeg savner en følelse av mening', tiltak: ['hjelp-noen', 'takkemelding'] },
    ],
    kurs: [],
  },
];

// Små, konkrete grep. minutes = omtrentlig tid per dag (eller per gang).
export const TILTAK = {
  'fast-vekketid': {
    area: 'sovn', title: 'Samme vekketid hver dag', minutes: 1,
    why: 'Kroppsklokka styres mest av når du står opp. Fast vekketid, også i helgene, er det enkleste grepet for en stabil døgnrytme.',
    how: ['Velg én vekketid du kan holde alle sju dagene.', 'Sett alarmen et stykke unna senga.', 'Stå opp når den ringer, selv om du har sovet dårlig.'],
  },
  'leggealarm': {
    area: 'sovn', title: 'Leggealarm', minutes: 1,
    why: 'Mange husker å stå opp, men glemmer å legge seg. En alarm om kvelden minner deg på å begynne å runde av.',
    how: ['Sett en alarm 60 minutter før du vil sove.', 'Når den ringer: dempe lyset og gjøre deg klar til natta.'],
  },
  'morgenlys': {
    area: 'sovn', title: '10 minutter dagslys om morgenen', minutes: 10,
    why: 'Dagslys tidlig på dagen gir kroppen et tydelig «nå er det dag» og gjør det lettere å bli trøtt om kvelden.',
    how: ['Gå ut innen en time etter at du står opp.', 'Ta kaffen på trappa, gå til bussen, eller gå en kort runde.', 'Om vinteren: gå ut når det er lysest.'],
  },
  'skjermfri-kveld': {
    area: 'sovn', title: 'Skjermfri siste halvtime', minutes: 30,
    why: 'Skjermer holder hodet i gang. En rolig halvtime gir hjernen tid til å gire ned.',
    how: ['Legg mobilen til lading utenfor soverommet.', 'Les, strekk ut, eller hør på noe rolig i stedet.'],
  },
  'tankedump': {
    area: 'sovn', title: 'Tankedump før leggetid', minutes: 5,
    why: 'Når tankene står på papiret trenger ikke hodet å holde på dem hele natta.',
    how: ['Ha en notatblokk ved senga.', 'Skriv ned alt som surrer: oppgaver, bekymringer, ideer.', 'Skriv én ting du gjør med det i morgen.'],
  },
  'pust-478': {
    area: 'sovn', title: '4-7-8-pust', minutes: 2,
    why: 'Lang utpust roer ned nervesystemet og kan gjøre det lettere å sovne igjen.',
    how: ['Pust inn gjennom nesa i 4 sekunder.', 'Hold pusten i 7 sekunder.', 'Pust rolig ut gjennom munnen i 8 sekunder.', 'Gjenta fire ganger.'],
  },
  'solvandring': {
    area: 'kropp', title: 'En tur i sola', minutes: 15,
    why: 'Bevegelse, dagslys og frisk luft er en av de enkleste måtene å løfte både humør og energi på.',
    how: ['Gå 15 minutter ute, helst midt på dagen.', 'Ingen krav til tempo, bare kom deg ut.', 'Legg merke til tre ting du ser underveis.'],
  },
  'tre-gode-ting': {
    area: 'mental', title: 'Tre gode ting', minutes: 3,
    why: 'Hjernen legger lettere merke til det som er galt. Å skrive ned det som gikk bra trener oppmerksomheten.',
    how: ['Om kvelden: skriv ned tre ting som gikk bra i dag, store eller små.', 'Skriv én setning om hvorfor hver av dem skjedde.'],
  },
  'bekymringstid': {
    area: 'mental', title: 'Fast bekymringstid', minutes: 15,
    why: 'Når du gir bekymringene en fast tid, blir det lettere å legge dem til side resten av dagen.',
    how: ['Sett av 15 minutter til samme tid hver dag, ikke rett før leggetid.', 'Dukker en bekymring opp ellers: noter den og si «den tar jeg kl. 17».', 'I bekymringstiden: gå gjennom lista og se om det er noe du kan gjøre.'],
  },
  'boks-pust': {
    area: 'mental', title: 'Bokspust', minutes: 2,
    why: 'Rolig, jevn pust er en rask måte å senke stressnivået på, og den kan brukes hvor som helst.',
    how: ['Pust inn i 4 sekunder.', 'Hold i 4.', 'Pust ut i 4.', 'Hold i 4.', 'Gjenta i to minutter.'],
  },
  'venne-stemmen': {
    area: 'mental', title: 'Snakk til deg selv som til en venn', minutes: 2,
    why: 'Vi er ofte mye strengere med oss selv enn med andre. Selvmedfølelse gjør oss ikke late, den gjør det lettere å prøve igjen.',
    how: ['Legg merke til når du kritiserer deg selv.', 'Spør: «Hva ville jeg sagt til en god venn i samme situasjon?»', 'Si eller skriv det til deg selv.'],
  },
  'snakk-med-noen': {
    area: 'mental', title: 'Snakk med noen i dag', minutes: 15,
    why: 'Du trenger ikke stå i dette alene. Å sette ord på det sammen med noen er et viktig første steg.',
    how: ['Ring Mental Helses hjelpetelefon 116 123 eller Kirkens SOS 22 40 00 40 (hele døgnet).', 'Bestill time hos fastlegen.', 'Er det akutt: ring 113.'],
  },
  'reis-deg': {
    area: 'kropp', title: 'Reis deg hver time', minutes: 2,
    why: 'Korte avbrekk fra sittingen gir kroppen og hodet en liten «restart».',
    how: ['Sett en påminnelse hver hele time.', 'Reis deg, strekk armene opp og gå noen skritt.', 'Fyll gjerne vannglasset samtidig.'],
  },
  'mikrookt': {
    area: 'kropp', title: 'Fem-minutters økt', minutes: 5,
    why: 'Litt er mye bedre enn ingenting. En kort økt bygger vanen før du bygger formen.',
    how: ['10 knebøy, 10 push-ups (gjerne mot veggen), 20 sekunder planke.', 'Gjenta to–tre runder.', 'Gjør det samme sted og tid hver dag.'],
  },
  'treningsavtale': {
    area: 'kropp', title: 'Tren sammen med noen', minutes: 30,
    why: 'Det er mye lettere å møte opp når noen venter på deg, og du får sosial kontakt på kjøpet.',
    how: ['Spør en venn eller kollega om en fast tur eller økt i uka.', 'Avtal dag og klokkeslett, ikke «en gang».'],
  },
  'vann-forst': {
    area: 'kosthold', title: 'Et stort glass vann først', minutes: 1,
    why: 'Mange er litt dehydrert om morgenen. Et glass vann er en enkel start som gir et lite løft.',
    how: ['Sett et glass ved senga eller kaffemaskinen.', 'Drikk det før kaffen.'],
  },
  'enkel-frokost': {
    area: 'kosthold', title: 'Enkel frokost med protein', minutes: 5,
    why: 'En frokost med litt protein gir jevnere energi og mindre sug senere på dagen.',
    how: ['Eksempler: egg, yoghurt med havre, brødskive med ost eller makrell.', 'Gjør gjerne frokosten klar kvelden før.'],
  },
  'middagsplan': {
    area: 'kosthold', title: 'Planlegg tre middager', minutes: 15,
    why: 'Med en plan blir det færre «hva skal vi spise?»-øyeblikk og mindre impulsspising.',
    how: ['Søndag: velg tre enkle middager for uka.', 'Skriv handleliste og handle én gang.'],
  },
  'mer-gront': {
    area: 'kosthold', title: 'En neve grønt til hvert måltid', minutes: 2,
    why: 'I stedet for å kutte noe ut kan du legge noe til. Grønnsaker gir metthet og næring.',
    how: ['Ha cherrytomater, gulrøtter eller frosne grønnsaker lett tilgjengelig.', 'Legg en neve på tallerkenen først.'],
  },
  'ring-venn': {
    area: 'relasjoner', title: 'Ring en venn i ti minutter', minutes: 10,
    why: 'En kort samtale med noen du bryr deg om er noe av det mest effektive du kan gjøre for humøret.',
    how: ['Velg én person i dag.', 'Ring heller enn å sende melding.', 'Det holder å spørre «hva skjer med deg for tiden?»'],
  },
  'fast-avtale': {
    area: 'relasjoner', title: 'En fast ukentlig avtale', minutes: 60,
    why: 'Relasjoner holdes ved like med gjentagelse. En fast avtale tar bort planleggingen.',
    how: ['Avtal en fast ting med noen: middag, tur, quiz.', 'Legg det inn i kalenderen som gjentagende.'],
  },
  'hils-pa-en': {
    area: 'relasjoner', title: 'Si noe hyggelig til en fremmed', minutes: 1,
    why: 'Små samtaler med fremmede gir mer glede enn vi tror, og trener sosialt mot.',
    how: ['Én gang i dag: kommenter noe til kassabetjent, nabo eller noen i køen.', 'Et smil og «så fin jakke!» holder.', 'Se kurset «Smalltalk med fremmede» for mer.'],
  },
  'takkemelding': {
    area: 'relasjoner', title: 'Send en takkemelding', minutes: 3,
    why: 'Å uttrykke takknemlighet gjør både deg og mottakeren glad, og styrker båndet.',
    how: ['Tenk på noen som har betydd noe for deg.', 'Send en kort melding og fortell hva og hvorfor.'],
  },
  'pause-svar': {
    area: 'grenser', title: '«La meg tenke på det»', minutes: 1,
    why: 'Det er lettere å si nei når du ikke må svare på stedet. En pause gir deg tid til å kjenne etter.',
    how: ['Når noen spør deg om noe: svar «La meg sjekke og komme tilbake til deg».', 'Kjenn etter: vil jeg dette, og har jeg plass?', 'Svar innen avtalt tid, også om det er nei.'],
  },
  'tre-viktigste': {
    area: 'grenser', title: 'Dagens tre viktigste', minutes: 3,
    why: 'En kort liste gjør det tydelig hva som faktisk må gjøres, og hva som kan vente.',
    how: ['Om morgenen: skriv ned de tre viktigste oppgavene i dag.', 'Gjør dem før alt annet når det er mulig.', 'Får du dem gjort, er dagen god nok.'],
  },
  'avslutningsritual': {
    area: 'grenser', title: 'Avslutningsritual etter jobb', minutes: 5,
    why: 'Et tydelig punktum hjelper hodet å skille mellom jobb og fritid.',
    how: ['Skriv ned hva du skal starte med i morgen.', 'Lukk PC-en og si «ferdig for i dag».', 'Gjør noe fysisk: skift klær, gå en kort tur.'],
  },
  'varslingsfri': {
    area: 'grenser', title: 'To timer uten varsler', minutes: 0,
    why: 'Hvert varsel stjeler litt oppmerksomhet. Noen timer uten gir ro.',
    how: ['Skru på «Ikke forstyrr» to timer hver dag.', 'Velg en fast tid, for eksempel kl. 19–21.'],
  },
  'to-minutter': {
    area: 'mestring', title: 'Bare start i to minutter', minutes: 2,
    why: 'Det vanskeligste er å begynne. Når du først er i gang, blir det ofte lettere å fortsette.',
    how: ['Velg oppgaven du utsetter.', 'Bestem deg for å jobbe med den i bare to minutter.', 'Etter to minutter kan du slutte, eller fortsette om du vil.'],
  },
  'fokusokt': {
    area: 'mestring', title: '25 minutters fokusøkt', minutes: 25,
    why: 'Korte, tidsbestemte økter gjør store oppgaver mer overkommelige og holder distraksjoner unna.',
    how: ['Legg vekk telefonen.', 'Still en tidtaker på 25 minutter og jobb med én ting.', 'Ta 5 minutter pause etterpå.'],
  },
  'ovelse-daglig': {
    area: 'mestring', title: '15 minutter med en ferdighet', minutes: 15,
    why: 'Små, daglige økter gir mer framgang enn sjeldne, lange. Å merke at du blir bedre gir mestringsfølelse.',
    how: ['Velg én ferdighet: språk, instrument, koding, matlaging.', 'Øv 15 minutter samme tid hver dag.', 'Noter én ting du lærte.'],
  },
  'ukeplan': {
    area: 'mestring', title: 'Ukeplan på søndag', minutes: 15,
    why: 'Et kvarter med oversikt gir en roligere uke.',
    how: ['Se over kalenderen for uka.', 'Skriv ned de viktigste målene for uka.', 'Sett av tid til dem i kalenderen.'],
  },
  'gledesliste': {
    area: 'glede', title: 'Gledeslista', minutes: 10,
    why: 'Når du er sliten, er det vanskelig å komme på hva som gjør deg glad. Med en liste klar trenger du bare å velge.',
    how: ['Skriv ned ti små ting du liker: en sang, en kopp te i sola, et bad.', 'Gjør én ting fra lista hver dag.'],
  },
  'noe-nytt': {
    area: 'glede', title: 'Prøv noe nytt hver uke', minutes: 30,
    why: 'Nye opplevelser gir hjernen påfyll og gjør at tiden føles rikere.',
    how: ['Gå en ny rute, lag en ny rett, besøk et nytt sted.', 'Skriv ned hva du prøvde.'],
  },
  'natur': {
    area: 'glede', title: 'Tid i naturen', minutes: 20,
    why: 'Tid i grønne omgivelser er forbundet med lavere stress og bedre humør.',
    how: ['Finn nærmeste park, skog eller vann.', 'Gå uten mål, og legg gjerne vekk mobilen.'],
  },
  'hjelp-noen': {
    area: 'glede', title: 'Gjør noe for andre', minutes: 10,
    why: 'Å hjelpe andre er en av de mest pålitelige kildene til mening og glede.',
    how: ['Én liten ting i dag: bær en pose, gi en kompliment, spør en kollega om de trenger hjelp.', 'Vurder frivillig arbeid på sikt.'],
  },
};

// Mini-kurs: én leksjon per dag med en liten oppgave.
export const KURS = {
  'si-nei': {
    area: 'grenser', title: 'Si nei og sett grenser', emoji: '🛡️',
    intro: 'Fem korte leksjoner for deg som sier ja for ofte. Hver dag får du én idé og én liten øvelse.',
    lessons: [
      { title: 'Hvorfor er det så vanskelig?', text: 'Vi sier ofte ja fordi vi er redde for å skuffe, virke late eller miste noen. Men hvert ja til noe du ikke vil, er et nei til noe annet: hvile, familie, egne mål.', task: 'Skriv ned tre ting du har sagt ja til den siste uka. Hvilke av dem ville du egentlig sagt nei til?' },
      { title: 'Kjenn etter før du svarer', text: 'Du har lov til å bruke tid. «La meg sjekke og komme tilbake til deg» er en hel setning. Pausen gir deg tid til å kjenne etter i stedet for å svare på autopilot.', task: 'Bruk pause-svaret minst én gang i dag, også om svaret blir ja.' },
      { title: 'Et vennlig, tydelig nei', text: 'Et godt nei er kort, varmt og uten lange unnskyldninger. Oppskrift: anerkjenn, si nei, tilby eventuelt et alternativ. «Takk for at du spør! Jeg har ikke kapasitet denne gangen, men spør meg gjerne neste måned.»', task: 'Skriv ditt eget standard-nei. Øv på å si det høyt tre ganger.' },
      { title: 'Når noen presser på', text: 'Noen spør igjen. Da kan du bruke «knust plate»: gjenta budskapet rolig, uten nye argumenter. «Jeg skjønner at det er viktig for deg. Svaret er fortsatt nei.»', task: 'Tenk på en situasjon hvor du pleier å gi etter. Hva vil du si neste gang?' },
      { title: 'Grenser er en gave', text: 'Tydelige grenser gjør relasjoner tryggere: folk vet hvor de har deg, og ja-ene dine betyr mer. Ubehaget ved å si nei går over, men utbrentheten av å aldri gjøre det blir værende.', task: 'Si nei til én ting denne uka som du egentlig ikke vil. Legg merke til hva som skjer.' },
    ],
  },
  'smalltalk': {
    area: 'relasjoner', title: 'Smalltalk med fremmede', emoji: '💬',
    intro: 'Fem dager med små, trygge øvelser for å bli mer komfortabel med å prate med folk du ikke kjenner.',
    lessons: [
      { title: 'Folk vil gjerne prate', text: 'Forskning viser at vi undervurderer hvor mye andre liker å snakke med oss. De fleste er like usikre som deg, og glade for at noen andre tar initiativet.', task: 'Smil og hils på tre personer i dag: nabo, sjåfør eller kassabetjent.' },
      { title: 'Åpningsreplikken', text: 'Den enkleste åpningen er noe dere begge ser eller opplever: «Lang kø i dag, gitt!», «Så fin hund, hva heter den?». Den trenger ikke være smart, bare vennlig.', task: 'Bruk én observasjon som åpning med en fremmed i dag.' },
      { title: 'Åpne spørsmål', text: 'Spørsmål som starter med «hva», «hvordan» og «hvorfor» gir lengre svar enn ja/nei-spørsmål. «Hva gjør at du kommer hit?» åpner mer enn «Kommer du ofte hit?».', task: 'Still minst ett åpent spørsmål i en samtale i dag.' },
      { title: 'Lytt og bygg videre', text: 'Gode samtaler handler mer om å lytte enn å være morsom. Plukk opp noe den andre sa og spør videre: «Du nevnte at du nettopp har flyttet, hvordan er det?»', task: 'I en samtale i dag: still ett oppfølgingsspørsmål om noe den andre sa.' },
      { title: 'Avslutt på en god måte', text: 'Det er helt greit å runde av. «Hyggelig å prate med deg, ha en fin dag!» er nok. En god avslutning gjør det lettere å ta kontakt igjen.', task: 'Ha én samtale med en fremmed på minst to minutter, og avslutt den bevisst.' },
    ],
  },
  'dognrytme': {
    area: 'sovn', title: 'Nullstill døgnrytmen', emoji: '🌅',
    intro: 'Fem steg for å få døgnrytmen på plass igjen. Ta ett steg per dag, og behold de forrige.',
    lessons: [
      { title: 'Velg vekketid', text: 'Døgnrytmen starter med når du står opp, ikke når du legger deg. Velg én vekketid som fungerer alle sju dager.', task: 'Bestem vekketiden din og sett alarmen for i morgen.' },
      { title: 'Lys om morgenen', text: 'Dagslys i øynene tidlig på dagen er det sterkeste signalet til kroppsklokka. Selv en overskyet dag gir mye mer lys ute enn inne.', task: 'Vær ute i minst 10 minutter innen en time etter at du står opp.' },
      { title: 'Koffein med klokka', text: 'Koffein virker i mange timer. Kaffe sent på dagen kan gjøre det vanskeligere å sovne, selv om du ikke merker det.', task: 'Ingen koffein etter kl. 14 i dag.' },
      { title: 'Nedtrappingstime', text: 'Hjernen trenger en overgang fra dag til natt. Dempet lys, mindre skjerm og rolige aktiviteter den siste timen hjelper.', task: 'Sett en leggealarm 60 minutter før du vil sove. Skru ned lyset når den ringer.' },
      { title: 'Når du ikke får sove', text: 'Ligger du våken lenge, kan det hjelpe å stå opp en stund og gjøre noe rolig i dempet lys, og gå tilbake når du blir trøtt. Senga skal forbindes med søvn, ikke grubling.', task: 'Legg en notatblokk ved senga til tankedump. Bruk den i kveld.' },
    ],
  },
};

// Byggeklosser til morgenritualet. Velg noen som til sammen blir 10–15 minutter.
export const MORGEN = [
  { id: 'm-vann', title: 'Et stort glass vann', minutes: 1, emoji: '💧' },
  { id: 'm-mobil', title: 'Ingen mobil de første 15 minuttene', minutes: 0, emoji: '📵' },
  { id: 'm-seng', title: 'Re opp senga', minutes: 1, emoji: '🛏️' },
  { id: 'm-lys', title: 'Åpne vinduet og få dagslys', minutes: 2, emoji: '☀️' },
  { id: 'm-kaldt', title: 'Kaldt vann i ansiktet', minutes: 1, emoji: '🧊' },
  { id: 'm-strekk', title: 'Strekk ut kroppen', minutes: 3, emoji: '🧘' },
  { id: 'm-pust', title: 'Bokspust', minutes: 2, emoji: '🌬️' },
  { id: 'm-takk', title: 'Tre ting du er takknemlig for', minutes: 2, emoji: '🙏' },
  { id: 'm-intensjon', title: 'Dagens intensjon: hva vil du få til i dag?', minutes: 1, emoji: '🎯' },
  { id: 'm-skriv', title: 'Skriv fritt i fem minutter', minutes: 5, emoji: '✍️' },
  { id: 'm-les', title: 'Les noen sider i en bok', minutes: 5, emoji: '📖' },
  { id: 'm-tur', title: 'Kort gåtur rundt kvartalet', minutes: 10, emoji: '🚶' },
];

export const MORGEN_FORSLAG = [
  { title: 'Rolig start', ids: ['m-vann', 'm-mobil', 'm-lys', 'm-strekk', 'm-pust', 'm-takk', 'm-intensjon'] },
  { title: 'Energi', ids: ['m-vann', 'm-kaldt', 'm-tur', 'm-intensjon'] },
  { title: 'Klart hode', ids: ['m-vann', 'm-mobil', 'm-pust', 'm-skriv', 'm-intensjon'] },
];

export const HELP_LINES = [
  { name: 'Akutt fare: Medisinsk nødtelefon', number: '113' },
  { name: 'Legevakt', number: '116 117' },
  { name: 'Mental Helse hjelpetelefon (døgnåpen)', number: '116 123' },
  { name: 'Kirkens SOS (døgnåpen)', number: '22 40 00 40' },
];

// Livsstilshjulet: 18 områder som til sammen påvirker helse og livskvalitet.
// Inspirert av «Livsstilshjulet» fra InFlow24 (områdenavnene); beskrivelsene er våre egne.
// tiltak/kurs peker på innhold over; help vises for områder der det kan være lurt å få hjelp.
// optional: 10 kan bety «ikke aktuelt», så området vises ikke som en styrke.
export const WHEEL = [
  { id: 'overskudd', name: 'Overskudd', emoji: '🔋', description: 'Å ha nok energi til å møte utfordringer og gjøre det som betyr noe for deg, på jobb, hjemme og i fritiden.', tiltak: ['solvandring', 'vann-forst', 'gledesliste'] },
  { id: 'fysisk', name: 'Fysisk aktivitet', emoji: '🏃', description: 'All bevegelse som får kroppen til å bruke mer energi enn i hvile, fra gåturer og trapper til trening.', tiltak: ['mikrookt', 'solvandring', 'treningsavtale'] },
  { id: 'sosiale', name: 'Sosiale relasjoner', emoji: '🤝', description: 'Å ha gode forhold til familie og venner.', tiltak: ['ring-venn', 'fast-avtale', 'takkemelding'], kurs: ['smalltalk'] },
  { id: 'stress', name: 'Stress', emoji: '🌡️', description: 'Når press og forventninger over tid blir større enn det som føles greit å bære.', tiltak: ['boks-pust', 'tre-viktigste', 'avslutningsritual'] },
  { id: 'tankesett', name: 'Tankesett', emoji: '💭', description: 'Evnen til å se det som er bra i en situasjon, og lete etter muligheter og løsninger fremfor hindringer.', tiltak: ['tre-gode-ting', 'venne-stemmen', 'bekymringstid'] },
  { id: 'egenomsorg', name: 'Egenomsorg', emoji: '🫶', description: 'Å ta vare på deg selv, både fysisk og psykisk, gjøre det som er riktig for deg, og kunne sette grenser og si nei.', tiltak: ['pause-svar', 'venne-stemmen', 'gledesliste'], kurs: ['si-nei'] },
  { id: 'dognrytme', name: 'Døgnrytme', emoji: '🕰️', description: 'En fast rytme i hverdagen, som å stå opp, spise og legge seg til omtrent samme tid.', tiltak: ['fast-vekketid', 'morgenlys', 'leggealarm'], kurs: ['dognrytme'], morgen: true },
  { id: 'sovn', name: 'Søvn', emoji: '🌙', description: 'Å få nok søvn, og søvn av god nok kvalitet til at du føler deg uthvilt.', tiltak: ['skjermfri-kveld', 'tankedump', 'pust-478'] },
  { id: 'hygiene', name: 'Hygiene', emoji: '🧼', description: 'Å ta vare på egen renslighet: kropp, tenner, negler, hår, klær og sko.', tiltak: ['hygiene-rutine', 'fast-vekketid'] },
  { id: 'kosthold', name: 'Kosthold', emoji: '🥗', description: 'Gode matvaner i hverdagen, og bevissthet om hva som er bra mat og drikke for deg og helsen din.', tiltak: ['enkel-frokost', 'middagsplan', 'mer-gront'] },
  { id: 'royking', optional: true, name: 'Røyking og snus', emoji: '🚭', description: 'I hvilken grad du røyker eller snuser. Bruker du ikke tobakk, gir du 10.', tiltak: ['tobakk-plan'], help: [{ name: 'Slutta-appen fra Helsedirektoratet', number: null }, { name: 'Fastlegen kan hjelpe med plan og eventuelle hjelpemidler', number: null }] },
  { id: 'rus', optional: true, name: 'Rus', emoji: '🍷', description: 'I hvilken grad du bruker alkohol, narkotika eller vanedannende medisiner. Er dette ikke et tema for deg, gir du 10.', tiltak: ['rus-dagbok'], help: [{ name: 'Fastlegen, eller kommunens rus- og psykiatritjeneste', number: null }, { name: 'Legevakt', number: '116 117' }] },
  { id: 'spill', optional: true, name: 'Spill', emoji: '🎰', description: 'Om du har kontroll over pengespill eller dataspill, eller om spillingen styrer tanker, følelser og hverdag. Spiller du ikke, gir du 10.', tiltak: ['spill-grenser'], help: [{ name: 'Hjelpelinjen for spilleavhengige (anonym, også for pårørende)', number: '800 800 40' }] },
  { id: 'okonomi', name: 'Økonomi', emoji: '💰', description: 'Å kunne betale faste utgifter, ha en forutsigbar inntekt og av og til unne deg noe ekstra.', tiltak: ['budsjett'], help: [{ name: 'NAVs økonomi- og gjeldsrådgivning (gratis)', number: '55 55 33 39' }] },
  { id: 'bolig', name: 'Bolig', emoji: '🏠', description: 'Å ha et sted å bo der du trives og føler deg trygg.', tiltak: ['hjem-ti-min'], help: [{ name: 'NAV-kontoret ditt kan hjelpe hvis du mangler eller står i fare for å miste bolig', number: '55 55 33 33' }] },
  { id: 'utdanning', name: 'Utdanning', emoji: '🎓', description: 'Å ha en utdanning eller lang praksis som gir deg et fagfelt å stå på, og muligheten til å lære mer.', tiltak: ['karriereveiledning', 'ovelse-daglig'] },
  { id: 'arbeid', name: 'Arbeid', emoji: '💼', description: 'Å ha et arbeid du mestrer, eller en vei mot det.', tiltak: ['mestringslogg', 'to-minutter', 'avslutningsritual'] },
  { id: 'fritid', name: 'Fritid', emoji: '🎨', description: 'Aktiviteter du trives med på fritiden: musikk, kunst, bøker, friluftsliv, foreninger, kurs eller trening.', tiltak: ['noe-nytt', 'gledesliste', 'natur'] },
];

// Tiltak som bare hører til livsstilshjulet.
Object.assign(TILTAK, {
  'hygiene-rutine': {
    area: 'hygiene', title: 'Fast stell morgen og kveld', minutes: 5,
    why: 'Når stellet blir en fast rutine, krever det mindre energi, også på dager der alt føles tungt.',
    how: ['Bestem tre ting du alltid gjør om morgenen, for eksempel tannpuss, ansiktsvask og rene klær.', 'Legg fram klær kvelden før.', 'Henger du etter: start med bare tannpussen og bygg videre.'],
  },
  'tobakk-plan': {
    area: 'royking', title: 'Lag en slutteplan', minutes: 10,
    why: 'Med en plan, en dato og støtte rundt deg er sjansen for å lykkes mye større enn om du bare prøver å slutte på direkten.',
    how: ['Velg en sluttdato innen to uker.', 'Skriv ned når du pleier å røyke eller snuse, og hva du kan gjøre i stedet.', 'Last ned Slutta-appen, eller snakk med fastlegen om hjelpemidler.'],
  },
  'rus-dagbok': {
    area: 'rus', title: 'En ukes rusdagbok', minutes: 2,
    why: 'Det er vanskelig å endre noe man ikke har oversikt over. En ærlig dagbok gir et bedre bilde enn magefølelsen.',
    how: ['Noter hver dag hva, hvor mye og i hvilken situasjon.', 'Se etter mønstre etter en uke.', 'Bekymrer det deg: snakk med fastlegen. Det er vanlig, og du blir tatt på alvor.'],
  },
  'spill-grenser': {
    area: 'spill', title: 'Sett grenser for spillingen', minutes: 10,
    why: 'Tekniske sperrer gjør det lettere å holde det du har bestemt deg for, også når suget kommer.',
    how: ['Sett tapsgrenser hos spillselskapet, eller steng kontoen.', 'Be banken sperre kortet ditt for pengespill.', 'Ring Hjelpelinjen på 800 800 40 for en anonym prat.'],
  },
  'budsjett': {
    area: 'okonomi', title: 'Et enkelt månedsbudsjett', minutes: 30,
    why: 'Oversikt gir ro. Når du vet hvor pengene går, er det lettere å ta grep, og å be om hjelp tidlig.',
    how: ['Skriv opp faste inntekter og utgifter for én måned.', 'Se gjennom kontoutskriften og finn tre utgifter du kan kutte.', 'Sliter du med regninger: ring NAVs økonomirådstelefon på 55 55 33 39.'],
  },
  'hjem-ti-min': {
    area: 'bolig', title: 'Ti minutter for et bedre hjem', minutes: 10,
    why: 'Små forbedringer hjemme gjør det lettere å slappe av og trives der du bor.',
    how: ['Still en tidtaker på ti minutter.', 'Rydd eller gjør ett sted litt hyggeligere: en hylle, en krok, et lys.', 'Gjenta i morgen med et nytt sted.'],
  },
  'karriereveiledning': {
    area: 'utdanning', title: 'Utforsk mulighetene dine', minutes: 20,
    why: 'Det finnes flere veier til utdanning og kompetanse enn mange tror, også som voksen.',
    how: ['Skriv ned hva du kunne tenke deg å lære mer om.', 'Bestill gratis karriereveiledning hos karrieresenteret i fylket ditt.', 'Se etter korte kurs eller nettstudier som en første smakebit.'],
  },
  'mestringslogg': {
    area: 'arbeid', title: 'Mestringslogg', minutes: 3,
    why: 'Det vi får til, glemmer vi fort. En logg minner deg på at du faktisk mestrer ting.',
    how: ['Skriv ned én ting du fikk til på jobb, i jobbsøking eller i en oppgave i dag.', 'Les gjennom lista på fredag.'],
  },
});
