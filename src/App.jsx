import React, { useState, useEffect } from 'react';
import {
  BookOpen, CheckCircle2, XCircle, Layout, Trophy, Shuffle,
  ChevronLeft, ChevronRight, Check, Clock, Home, Settings2, RotateCcw, User, ImageIcon
} from 'lucide-react';

// --- I TUOI DATABASE DELLE DOMANDE ---

const ROSALBINO_QUESTIONS = [
{
    id: 1,
    text: "In un dielettrico attraversato da un’onda elettromagnetica piana e monocromatica, il valore istantaneo del vettore polarizzazione P:",
    options: [
        "Ha una differenza di fase di π rad rispetto al campo elettrico incidente per qualunque frequenza di oscillazione dell’onda",
        "Ha una differenza di fase di 0 rad rispetto al campo elettrico incidente per qualunque frequenza di oscillazione dell’onda",
        "Ha una differenza di fase che varia da -π/2rad a +π/2rad rispetto al campo elettrico incidente, a seconda della frequenza di oscillazione dell’onda",
        "Ha una differenza di fase di |π/2| rad rispetto al campo elettrico incidente per qualunque frequenza di oscillazione dell’onda"
    ],
    correctAnswer: 2
},

{
    id: 2,
    text: "La forza complessiva che agisce su di un dipolo elettrico, di momento di dipolo p ≠ 0 e massa m, immerso in un generico campo elettrostatico E ≠ 0:",
    options: [
        "è direttamente proporzionale alla massa m del dipolo",
        "è sempre nulla se E è uniforme",
        "è parallela al campo E",
        "è sempre nulla se E è parallelo o antiparallelo a p"
    ],
    correctAnswer: 1
},

{
  id: 3,
  text: "Le armature di un condensatore carico a facce piane parallele, distanziate da un materiale dielettrico vengono caricate da un generatore di forza f.e.m in continua. In un secondo momento, la f.e.m. viene raddoppiata, mantenendo connesso il generatore al condensatore. Quali delle seguenti affermazioni è corretta:",
  options: [
    "il vettore Polarizzazione P, nel dielettrico, raddoppia il modulo",
    "il vettore Polarizzazione P, nel dielettrico, dimezza il modulo",
    "Complessivamente, le cariche di polarizzazione totali raddoppiano",
    "il vettore Polarizzazione P, nel dielettrico, non varia di modulo"
  ],
  correctAnswer: 0
},

{
    id: 4,
    text: "Il campo magnetico nel vuoto B può essere misurato come:",
    options: [
        "Wb · m²",
        "Wb/C",
        "(H · V) / (Ω · m²)",
        "(N · A) / (V · m)"
    ],
    correctAnswer: 2
},

{
  id: 5,
  text: "Una cella fotovoltaica in silicio copre una superficie A = 1.5 m² e produce una corrente I=0.5 A ad una tensione di 4 V quando illuminata dalla luce solare. Supponendo che la luce solare sia un'onda piana monocromatica, polarizzata linearmente, con ampiezza del campo elettrico E₀ = 30V/m, l'efficienza della cella fotovoltaica, calcolata come rapporto della potenza elettrica erogata sulla potenza fornita dalla radiazione è circa (ε₀ = 8.85 · 10⁻¹² F/m, μ₀ = 4π · 10⁻⁷ H/m):",
  options: ["(a) 3.35%", "(b) 0.033%", "(c) la situazione non è realizzabile", "(d) 89.61%"],
  correctAnswer: 2
},

{
    id: 6,
    text: "In due circuiti resistivi circolano rispettivamente le correnti stazionarie I₁ e I₂. Detto M il coefficiente di mutua induzione dei due circuiti:",
    options: ["(a) Il flusso del campo magnetico generato dal primo circuito, calcolato attraverso il secondo circuito è indipendente da M", "(b) Il flusso del campo magnetico generato dal primo circuito, calcolato attraverso il secondo circuito è inversamente proporzionale a M", "(c) Il flusso del campo magnetico generato dal primo circuito, calcolato attraverso il primo circuito è indipendente da M", "(d) M aumenta se aumentano le correnti circolanti nei due circuiti"],
    correctAnswer: 2
},

{
    id: 7,
    text: "Un solido diamagnetico immerso in un campo magnetico stazionario, il momento di dipolo magnetico che si forma a livello microscopico è:",
    options: ["(a) Indipendente dal campo magnetico esterno, perché dovuto esclusivamente alla configurazione microscopica del materiale", "(b) Parallelo al campo magnetico esterno", "(c) Perpendicolare al campo magnetico esterno", "(d) Localmente nullo se il campo magnetico esterno è nullo"],
    correctAnswer: 3
},

{
  id: 8,
  text: "Un cilindro dielettrico (raggio R= 5 cm, lunghezza h= 20 cm), avente costante dielettrica relativa εᵣ = 3 ruota attorno al suo asse con velocità angolare costante ω = 5 · 10⁴ rad/s. Il cilindro è immerso in un campo magnetico stazionario ed uniforme |B| = 3 T orientato parallelamente all'asse del cilindro. Le cariche di polarizzazione sulla superficie del cilindro sono:",
  options: ["(a) 0.199 μC", "(b) 0.13 μC", "(c) 0.25 μC", "(d) 0.08 μC"],
  correctAnswer: 0
},

{
  id: 9,
  text: "In uno spettrometro di massa, un primo ione con un dato rapporto carica/massa q1/m1 compie una traiettoria caratterizzata da un raggio di curvatura r. Se si raddoppia la ddp ΔV, quale rapporto carica massa q2/m2 dovrà avere un secondo ione per seguire una traiettoria col medesimo raggio di curvatura?",
  options: ["(a) q2/m2 = 2 · q1/m2", "(b) q2/m2 = 8 · q1/m2", "(c) q2/m2 = 1/8 · q1/m2", "(d) q2/m2 = 1/2 · q1/m2"],
  correctAnswer: 0
},

{
    id: 10,
    text: "Una prima distribuzione sferica di carica ha raggio r1 = 3mm ed ospita sulla superficie una carica q1. Una seconda distribuzione sferica di carica ha raggio r2 = 6mm ed ospita sulla superficie una carica q2. La distanza tra i centri delle due distribuzioni sferiche è R = 10mm. Il potenziale ad una distanza d = 2mm dal centro della prima distribuzione sferica è nullo. Quindi:",
    options: ["(a) q2 = 8/3 · q1", "(b) q1 = -3/8 · q2", "(c) q2 = 4 · q1", "(d) q1 = -1/4 · q2"],
    correctAnswer: 3
},

{
    id: 11,
    text: "Il coefficiente di auto induzione di un solenoide rettilineo a sezione circolare di raggio r = 1mm e lungo L = 10cm, dotato di N = 2000 spire e percorso da una corrente I = 3A è:",
    options: ["(a) Circa 1.6 mH", "(b) Circa 79 nH", "(c) Circa 0.16 mH", "(d) Circa 0.47 mH"],
    correctAnswer: 3
},

{
  id: 12,
  text: "La forza risultante su di una bobina circolare, con N avvolgimenti, percorsa da corrente stazionaria ed immersa in un campo magnetico B ≠ 0 statico, trascurando eventuali effetti induttivi:",
  options: ["(a) Se diversa da zero, è orientata sempre ortogonalmente al campo B", "b) È sempre nulla se il campo magnetico è uniforme", "c) È proporzionale al prodotto N·I·A·sinθ", "d) Dipende solo dalla direzione del campo B"],
  correctAnswer: 1
},

{
    id: 13,
    text: "Un cilindro conduttore cavo, di spessore trascurabile, altezza infinita e raggio a della base circolare, presenta una carica distribuita sulla superficie laterale. Il modulo del campo elettrostatico generato alla distanza r dall'asse del cilindro è:",
    options: ["(a) Costante, diverso da zero per r < a e direttamente proporzionale ad r per r > a", "(b) Nullo per r < a e inversamente proporzionale a r per r > a", "(c) Inversamente proporzionale a r per r < a e inversamente proporzionale ad r² per r > a", "(d) Nullo per r < a e inversamente proporzionale a r² per r > a"],
    correctAnswer: 2
},

{
  id: 14,
  text: "Un primo dielettrico ha indice di rifrazione n₁ = 1 ed un secondo dielettrico ha indice di rifrazione n₂ = 1.5. I due dielettrici sono in reciproco contatto lungo un'interfaccia planare e sono immersi in un campo elettrostatico. Si consideri il campo elettrostatico all'interfaccia: se E₁ è il campo nel primo dielettrico ed è orientato ad un angolo θ₁ = 30° rispetto alla normale all'interfaccia, quale sarà l'angolo θ₂ con cui è orientato il campo E₂ (rispetto alla normale all'interfaccia) nel secondo dielettrico?",
  options: ["(a) 40.89°", "(b) 37.59°", "(c) 49.1°", "(d) 52.41°"],
  correctAnswer: 0
},

{
    id: 15,
    text: "Una carica q = 0.3 mC è uniformemente distribuita su una superficie sferica di raggio R = 5mm. L'energia elettrostatica associata a tale distribuzione di carica è:",
    options: ["(a) Circa 40 kJ", "(b) Circa 162 kJ", "(c) Circa 81 kJ", "(d) Nessuna delle soluzioni proposte è corretta"],
    correctAnswer: 2
},

{
    id: 16,
    text: "In un'onda monocromatica sferica, la cui pulsazione e' ω₀:",
    options: ["a. Il vettore di Poynting e' sinusoidale con pulsazione ω₀ ed ha un'ampiezza uniforme nello spazio", "b. Il campo elettrico e' sinusoidale con pulsazione ω₀ ed ha un'ampiezza che decresce come 1/r, dove r e' la distanza dall'origine dell'onda", "c. Il campo elettrico e' sinusoidale con pulsazione ω₀ ed ha un'ampiezza che decresce come 1/r², dove r e' la distanza dall'origine dell'onda", "d. Il vettore di Poynting e' sinusoidale con pulsazione ω₀ ed ha un'ampiezza che decresce come 1/r, dove r e' la distanza dall'origine dell'onda"],
    correctAnswer: 1
},

{
  id: 17,
  text: "Si consideri la corrente oscillante che viene indotta in una spira conduttrice che ruota immersa in un campo magnetico uniforme. Quale delle seguenti affermazioni e' vera:",
  options: [
    "a. La corrente oscillante e' armonica e sfasata di |π| rispetto alla rotazione della spira",
    "b. La corrente oscillante e' armonica ed in fase con la rotazione della spira",
    "c. La corrente oscillante e' armonica e sfasata di |π/2| rispetto alla rotazione della spira",
    "d. La corrente oscillante ha un'ampiezza indipendente dalla frequenza di rotazione della spira"
  ],
  correctAnswer: 2
},

{
    id: 18,
    text: "Una spira quadrata di lato l=10 cm e resistenza R ruota confrequenza ν₀=15 Hz in un campo magnetico uniforme di modulo |B|=15 mT. La potenza media dissipata e' di 50 W. La resistenza della spira e':",
    options: ["a. circa 4 μΩ", "b. circa 2 μΩ", "c. circa 0.4 mΩ", "d. circa 0.2 mΩ"],
    correctAnswer: 3
},

{
    id: 19,
    text: "Il modulo del vettore di Poynting di un'onda piana monocromatica si misura in:",
    options: ["a. C·T/s²", "b. J/s", "c. V/m·C/s", "d. A/m²·V/m"],
    correctAnswer: 0
},

{
    id: 20,
    text: "In un materiale paramagnetico, il vettore magnetizzazione M:",
    options: ["a. E' sempre uniforme", "b. E' parallelo al vettore densita' superficiale di corrente amperiana j_m", "c. E' parallelo al campo magnetizzante H", "d. E' parallelo al vettore densita' lineare di corrente amperiana j_{s,m}"],
    correctAnswer: 2
},

{
  id: 21,
  text: "Un cilindro dielettrico neutro e' immerso in un campo magnetico uniforme, parallelo al suo asse. Il cilindro ruota intorno al suo asse con una velocita' angolare costante. Quale delle seguenti affermazioni e' corretta:",
  options: ["a. Sulla sua superficie laterale compaiono cariche di polarizzazione il cui segno dipende dal verso di rotazione del cilindro e dal verso del campo magnetico", "b. Sulla sua superficie laterale non compaiono cariche di polarizzazione", "c. Sulla sua superficie laterale compaiono cariche di polarizzazione il cui segno dipende unicamente dal verso del campo magnetico", "d. Sulla sua superficie laterale compaiono cariche di polarizzazione il cui segno dipende unicamente dal verso di rotazione del cilindro"],
  correctAnswer: 1
},

{
  id: 22,
  text: "Un dipolo elettrico, avente momento |p| = 2 · 10⁻¹² C·m e' collocato ad una distanza r = 4 mm da una distribuzione lineare (rettilinea) di carica, con densita' λ = 3 · 10⁻² C/m e lunghezza indefinita. Quale delle seguenti affermazioni e' corretta (ε₀ = 8.85 · 10⁻¹² F/m).",
  options: [
    "a. L'energia potenziale elettrostatica del dipolo non puo' mai essere negativa, qualunque sia l'orientazione del dipolo rispetto alla distribuzione rettilinea di carica",
    "b. Tutte le affermazioni precedenti sono errate",
    "c. Se il dipolo e' orientato parallelamente alla distribuzione rettilinea di carica, la sua energia potenziale elettrostatica e' nulla",
    "d. Se il dipolo e' orientato parallelamente alla distribuzione rettilinea di carica, la sua energia potenziale elettrostatica e', in valore assoluto, circa 0.27 J"
  ],
  correctAnswer: 1
},

{
  id: 23,
  text: "Due dipoli elettrici hanno momenti p1 e p2, paralleli e sono posti lungo una retta orientata perpendicolarmente rispetto ad essi. I due dipoli si trovano ad una distanza fissa d. Quale delle seguenti affermazioni e' corretta:",
  options: ["a. Tutte le altre affermazioni sono errate", "b. L'energia potenziale del primo dipolo e' nulla perche' e' nullo il potenziale elettrostatico prodotto dal secondo dipolo (nel punto in cui si trova il primo dipolo)", "c. L'energia potenziale del primo dipolo e' nulla perche' il campo elettrostatico prodotto dal secondo dipolo e' perpendicolare al momento del primo dipolo (nel punto in cui si trova il primo dipolo)", "d. L'energia potenziale del primo dipolo e' negativa perche' il campo elettrostatico prodotto dal secondo dipolo e' parallelo al momento del primo dipolo (nel punto in cui si trova il primo dipolo)"],
  correctAnswer: 3
},

{
    id: 24,
    text: "Vengono dati due solenoidi rettilinei a sezione circolare. Il primo solenoide ha sezione con raggio R₁ e densita' lineare di spire n₁. Il secondo solenoide ha sezione con raggio R₂ e densita' lineare di spire n₂. Entrambi i solenoidi sono molto lunghi rispetto alle loro dimensioni trasversali ed hanno medesima lunghezza d. Inoltre, sono disposti coassialmente uno rispetto all'altro. Nei due solenoidi circolano rispettivamente le correnti I₁ ed I₂. Quale delle seguenti affermazioni e' vera:",
    options: [
        "a. Tutte le altre affermazioni sono errate",
        "b. Il flusso del campo magnetico generato dal primo solenoide, calcolato attraverso il secondo solenoide e' uguale al flusso del campo magnetico generato dal secondo solenoide, calcolato attraverso il primo solenoide solamente se R₁ = R₂.",
        "c. Il flusso del campo magnetico generato dal primo solenoide, calcolato attraverso il secondo solenoide e' uguale al flusso del campo magnetico generato dal secondo solenoide, calcolato attraverso il primo solenoide solamente se I₁ = I₂.",
        "d. Il flusso del campo magnetico generato dal primo solenoide, calcolato attraverso il secondo solenoide e' uguale al flusso del campo magnetico generato dal secondo solenoide, calcolato attraverso il primo solenoide solamente se n₁ = n₂."
    ],
    correctAnswer: 3
},

{
    id: 25,
    text: "Si consideri un condensatore a facce piane e parallele la cui differenza di potenziale tra le armature varia armonicamente nel tempo con pulsazione ω₀. Quali tra le seguenti affermazioni e' corretta:",
    options: ["a. Viene prodotto un campo magnetico oscillante B, in fase con la differenza di potenziale tra le armature", "b. Viene prodotto un campo magnetico oscillante B, limitatamente alla regione di spazio compresa tra le armature del condensatore", "c. Viene prodotto un campo magnetico oscillante B il cui modulo puo' variare nello spazio", "d. Viene prodotto un campo magnetico oscillante B, la cui divergenza e' ovunque diversa da zero"],
    correctAnswer: 2
},

{
    id: 26,
    text: "Un condensatore a facce piane e parallele viene caricato con una carica Q e poi isolato. Dopodiche', il volume tra le armature viene riempito con un gas avente costante dielettrica relativa εr. Quale tra le seguenti affermazioni e' corretta:",
    options: [
        "a. L'energia elettrostatica Ue nel condensatore diminuisce di un fattore 1/εr²",
        "b. L'energia elettrostatica Ue nel condensatore aumenta di un fattore εr²",
        "c. L'energia elettrostatica Ue nel condensatore diminuisce di un fattore 1/εr",
        "d. L'energia elettrostatica Ue nel condensatore aumenta di un fattore εr"
    ],
    correctAnswer: 2
},

{
  id: 27,
  text: "Nel momento in cui viene chiuso l'interruttore di un circuito RL alimentato da un generatore ideale di tensione continua:",
  options: [
    "a. La corrente che circola nel circuito raggiungera' un valore asintotico seguendo una legge esponenziale la cui costante di tempo e' direttamente proporzionale alla resistenza R del circuito",
    "b. La corrente indotta che si viene a produrre ha intensita' massima nell'istante di chiusura dell'interruttore",
    "c. La corrente che circola nel circuito e' costante nel tempo",
    "d. La corrente che circola nel circuito raggiungera' un valore asintotico seguendo una legge esponenziale la cui costante di tempo dipende solo dall'autoinduttanza l"
  ],
  correctAnswer: 3
},

{
  id: 28,
  text: "Durante il processo di caricamento di un condensatore, in un circuito RC alimentato da un alimentatore ideale di tensione continua:",
  options: ["a. La potenza erogata dal generatore è costante nel tempo", "b. La potenza erogata dal generatore diminuisce nel tempo più velocemente di quanto diminuisca nel tempo la potenza dissipata dalla resistenza per effetto Joule", "c. La potenza erogata dal generatore varia nel tempo con la stessa costante di tempo con cui la resistenza dissipa potenza per effetto Joule", "d. Tutte le altre affermazioni sono errate"],
  correctAnswer: 1
},

{
  id: 29,
  text: "Un sottile guscio sferico materiale, avente raggio R e spessore trascurabile, ospita una carica Q distribuita in modo continuo sulla sua superficie. Quale tra le seguenti affermazioni e' corretta:",
  options: [
    "a. Il campo elettrostatico prodotto all'interno (cavo) del guscio sferico non puo' mai essere nullo se il guscio sferico e' costituito da materiale dielettrico",
    "b. Tutte le altre affermazioni sono errate",
    "c. Il campo elettrostatico prodotto nell'interno (cavo) del guscio sferico e' sempre nullo",
    "d. Il campo elettrostatico prodotto nell'interno (cavo) del guscio sferico e' nullo se, e solo se, il guscio sferico e' costituito da un materiale conduttore"
  ],
  correctAnswer: 2
},

{
    id: 30,
    text: "Una particella dotata di massa m e carica q viaggia di moto rettilineo uniforme a velocita' v costante, per poi entrare in una regione di spazio permeata da un campo magnetostatico uniforme B ⊥ v. Dopodiche' la particella procede di moto circolare uniforme. Quale tra le seguenti affermazioni e' corretta:",
    options: ["a. La forza centripeta a cui e' sottoposta la particella e' indipendente dalla sua massa m", "b. La forza centripeta a cui e' sottoposta la particella e' inversamente proporzionale alla sua massa m", "c. Tutte le altre affermazioni sono errate", "d. La forza centripeta a cui e' sottoposta la particella e' direttamente proporzionale alla sua massa m"],
    correctAnswer: 0
},

{
  id: 31,
  text: "In due circuiti resistivi circolano rispettivamente le correnti stazionarie I₁ e I₂. Detto M il coefficiente di mutua induzione dei due circuiti, la forza di interazione magnetica tra di essi",
  options: ["a) È proporzionale al gradiente del coefficiente di mutua induzione M", "b) È proporzionale al coefficiente di mutua induzione M", "c) Dipende dalla somma algebrica delle correnti I₁ e I₂", "d) È nulla poiché le correnti sono stazionarie"],
  correctAnswer: 3
},

{
  id: 32,
  text: "Una sbarretta conduttrice lunga d si muove a velocità costante v parallelamente ad un filo conduttore indefinito, in cui scorre una corrente stazionaria I. La sbarretta è orientata parallelamente al filo e mantiene una distanza costante r rispetto ad esso. A regime, ai capi della sbarretta si produce una differenza di potenziale:",
  options: ["a) Nulla", "b) Inversamente proporzionale alla lunghezza d della sbarretta", "c) Dipende dal logaritmo della distanza r", "d) Inversamente proporzionale alla distanza r della sbarretta dal filo"],
  correctAnswer: 2
},

{
  id: 33,
  text: "Se la capacità di un condensatore sferico (raggio interno rᵢ, raggio esterno rₑ) è identica a quella di una sfera conduttrice isolata, il raggio di quest’ultima:",
  options: ["a) È sempre maggiore di rₑ", "b) È sempre compreso tra rᵢ ed rₑ", "c) Può essere minore di rᵢ", "d) Può essere maggiore di rₑ"],
  correctAnswer: 3
},

{
    id: 34,
    text: "Un cilindro conduttore cavo, di spessore trascurabile, altezza infinita e raggio a della base circolare, presenta una carica distribuita sulla superficie laterale. Il modulo del campo elettrostatico generato alla distanza r dall’asse del cilindro è:",
    options: ["a) Nullo per r < a e inversamente proporzionale ad r per r > a", "b) Costante, diverso da zero per r < a e direttamente proporzionale ad r per r > a", "c) Inversamente proporzionale ad r per r < a ed inversamente proporzionale ad r² per r > a", "d) Nullo per r < a e inversamente proporzionale per r > a"],
    correctAnswer: 0
},

{
    id: 35,
    text: "Due circuiti RC sono alimentati da due identici generatori di tensione continua ΔV ed hanno rispettivamente resistenza e capacità C₂ = 5*C₁ e R₂ = 5*R₁ Inizialmente i circuiti sono aperti e all’istante t=0 vengono simultaneamente chiusi:",
    options: ["a) La costante di tempo del circuito 1 è maggiore di quella del circuito 2", "b) La corrente iniziale nel circuito 1 è minore di quella nel circuito 2", "c) La tensione sul condensatore del circuito 1 raggiunge il valore massimo più velocemente del circuito 2", "d) La carica massima sul condensatore del circuito 2 è maggiore di quella del circuito 1"],
    correctAnswer: 2
},

{
    id: 36,
    text: "DOMANDA 7\nUn solenoide di lunghezza L = 1m è costituito di N=5000 spire ed è attraversato da una corrente i=0.1A; il solenoide è riempito con un materiale diamagnetico avente suscettività magnetica χm = -2*10⁻³. quanto vale il modulo del vettore Magnetizzazione?",
    options: ["a) 1 A/m", "b) 1 Wb", "c) 1000 A/m", "d) 1 T/m"],
    correctAnswer: 0
},

{
  id: 37,
  text: "DOMANDA 8\nUn generatore mantiene una differenza di potenziale costante ΔV = 5mV ai capi del conduttore cilindrico di sezione d= 2mm e resistività ρ=8*10⁻³ Ωm. la densità volumica di potenza dissipata per effetto joule è:",
  options: ["a) Circa 781 W/m³", "b) Circa 1,56 W/m³", "c) Circa 312.5 W/m³", "d) Impossibile da calcolare se non si conosce la lunghezza del cilindro"],
  correctAnswer: 2
},

{
  id: 38,
  text: "DOMANDA 9\nUn cilindro conduttore è approssimabile ad un gas di elettroni. Alle estremità viene applicata una ddp tale da produrre un passaggio di corrente. Se n è la densità degli elettroni nei gas e m la loro massa:",
  options: ["a) La velocità istantanea degli elettroni è costante", "b) Le cariche si muovono con moto misto, con velocità media costante e proporzionale alla ddp", "c) La velocità media degli elettroni è costante ed è direttamente proporzionale a m", "d) La velocità media degli elettroni è proporzionale alla radice quadrata della ddp e inversamente proporzionale alla massa"],
  correctAnswer: 1
},

{
  id: 39,
  text: "Il coefficiente di mutua induzione per unità di lunghezza, riferito a due solenoidi rettilinei di diversa sezione circolare e diversa densità lineare di spire, disposte coassialmente:",
  options: ["a) È indipendente dall'area della sezione del solenoide interno", "b) Dipende dalla differenza delle aree delle sezioni dei due solenoidi", "c) Dipende dalla differenza dei raggi delle sezioni dei due solenoidi", "d) È indipendente dall'area della sezione del solenoide esterno"],
  correctAnswer: 0
},

{
  id: 40,
  text: "Una particella dotata di massa e carica inizialmente in quiete è immersa in un campo magnetostatico ed elettrostatico, vettorialmente paralleli tra loro ed uniformemente distribuiti nello spazio. Il moto assunto dalla particella è",
  options: ["a) Rettilineo uniformemente accelerato", "b) Elicoidale ( sovrapposizione di moti rettilineo uniforme e circolare uniforme che si sviluppano su piani tra loro perpendicolari)", "c) Rettilineo uniforme", "d) Circolare uniforme"],
  correctAnswer: 2
},

{
  id: 41,
  text: "Si considerino due cariche puntiformi q1 e q2, distanti d=5 mm. In un punto distante r1=4 mm da q1 ed r2=3 mm da q2, il potenziale elettrostatico e' nullo. Quale tra le seguenti affermazioni e' corretta",
  options: ["(a) q2 = -9/16 · q1", "(b) q1 = -4/3 · q2", "(c) q1 = 4/3 · q2", "(d) q1 = -1/5 · q2"],
  correctAnswer: 1
},

{
    id: 42,
    text: "Un condensatore a facce piane e parallele, avente le armature di forma circolare e' alimentato da una f e m. oscillante. Quale tra queste affermazioni e' corretta:",
    options: ["(a) il campo magnetico nello spazio tra le due armature e' sempre nullo", "(b) l'ampiezza del campo magnetico nello spazio tra le due armature decresce mano a mano che ci si allontana dall'asse del condensatore", "(c) il campo magnetico nello spazio tra le due armature e' oscillante", "(d) il campo magnetico nello spazio tra le due armature e' uniforme"],
    correctAnswer: 2
},

{
    id: 43,
    text: "Una sfera metallica cava (raggio interno R1, raggio esterno R2) e' isolata e caricata con una carica complessiva pari a +q. Quali tra le seguenti affermazioni e' corretta:",
    options: ["(a) il potenziale elettrostatico, per r<R1, e' nullo", "(b) il potenziale elettrostatico, per R1<r<R2 e' nullo", "(c) la differenza di potenziale elettrostatico tra superficie interna e superficie esterna e' q/4πε₀ · (1/R1 - 1/R2)", "(d) il potenziale elettrostatico, per R1<r<R2, e' costante e diverso da zero"],
    correctAnswer: 3
},

{
  id: 44,
  text: "Considerando il fenomeno della polarizzazione in un materiale dielettrico isotropo, quali delle seguenti affermazioni è corretta:",
  options: ["(a) se il materiale e' omogeneo, la densita' delle cariche di polarizzazione di volume e' nulla ovunque all'interno del materiale", "(b) il vettore D e' antiparallelo a P", "(c) complessivamente, le cariche di polarizzazione totali sono proporzionali all'integrale di volume del campo elettrostatico E all'interno del materiale", "(d) Il vettore Polarizzazione P è sempre parallelo al vettore campo elettrostatico E all'interno del materiale"],
  correctAnswer: 0
},

{
    id: 45,
    text: "L'energia elettrostatica contenuta in un condensatore sferico di raggio interno r_i = 1mm e raggio esterno r_e = 1.1mm, a cui viene applicata una ddp ε_0 = 8.85 · 10^{-12} F/m)",
    options: ["(a) circa 2.45 · 10^{-12} J", "(b) circa 1.22 · 10^{-12} J", "(c) circa 4.89 · 10^{-12} J", "(d) circa 2.22 · 10^{-9} J"],
    correctAnswer: 0
},

{
    id: 46,
    text: "La circuitazione del campo B, calcolata su una qualunque linea chiusa:",
    options: ["(a) e' nulla, a causa della solenoidalita' del campo B", "(b) non tiene conto delle correnti di magnetizzazione (amperiane) concatenate alla linea", "(c) in condizioni non stazionarie, tiene conto delle correnti di spostamento concatenate alla linea", "(d) non tiene conto delle correnti di conduzione concatenate alla linea"],
    correctAnswer: 2
},

{
  id: 47,
  text: "In un circuito RC alimentato da un generatore di tensione costante V, durante il processo di caricamento del condensatore, l'energia erogata dal generatore e'",
  options: ["(a) 1/2 · CV²", "(b) la meta' dell'energia dissipata sulla resistenza", "(c) la meta' dell'energia immagazzinata nel condensatore", "(d) CV²"],
  correctAnswer: 3
},

{
  id: 48,
  text: "Un generatore mantiene una differenza di potenziale costante ΔV = 1.5 mV tra la parete interna e la parete esterna di una sfera conduttrice cava, di raggio interno r_i = 2 mm, raggio esterno r_e = 3 mm e resistività ρ = 2 · 10⁻³ Ωm. La corrente e'",
  options: ["(a) 0 057 A", "(b) 0 085 A", "(c) 0 0265 A", "(d) 0 95 mA"],
  correctAnswer: 0
},

{
    id: 49,
    text: "Un circuito avente resistenza R e coefficiente di autoinduzione L e' collegato ad un generatore di tensione costante V, dotato di interruttore. Quale delle seguenti affermazioni e' corretta:",
    options: [
        "la potenza erogata dal generatore e' costante nel tempo, perche' si tratta di un generatore di tensione costante",
        "dopo un tempo lungo dalla chiusura del circuito, il generatore ha erogato un'energia che e' andata tutta dissipata sulla resistenza R",
        "dopo un tempo lungo dalla chiusura del circuito, la corrente indotta dissipa sulla resistenza un'energia pari a quella associata al campo magnetico prodotto",
        "la corrente totale nel circuito tendera' asintoticamente a zero, per tempi lunghi dopo la chiusura del circuito"
    ],
    correctAnswer: 2
},

{
    id: 50,
    text: "Su di un piano sono poste due cariche puntiformi q1 e q2. Sul medesimo piano, in un punto P posto a distanza r1 = 3mm da q1 ed r2 = 6mm da q2, il potenziale elettrostatico e' nullo. Quindi:",
    options: ["(a) q1 = -2 · q2", "(b) q1 = 2 · q2", "(c) q2 = -2 · q1", "(d) q2 = 2 · q1"],
    correctAnswer: 2
},

{
    id: 51,
    text: "Data una distribuzione cilindrica di carica con densit' volumica ρ, detta r la distanza dal suo asse:",
    options: ["(a) si produce un campo elettrostatico di modulo direttamente proporzionale a r all'interno del cilindro e decrescente come r^{-2} al di fuori", "(b) si produce un campo elettrostatico di modulo direttamente proporzionale a r all'interno del cilindro e decrescente come r^{-1} al di fuori", "(c) si produce un campo elettrostatico di modulo costante all'interno del cilindro e decrescente come r^{-1} al di fuori", "(d) si produce un campo elettrostatico di modulo costante all'interno del cilindro e decrescente come r^{-2} al di fuori"],
    correctAnswer: 1
},

{
    id: 52,
    text: "L'energia elettrostatica associata ad una carica Q=1.5 mC distribuita omogeneamente sulla superficie di una sfera di raggio R=6 cm e' circa (ε₀ = 8.85 · 10^{-12} F/m):",
    options: ["(a) 169 kJ", "(b) 30.35 J", "(c) 337 kJ", "(d)"],
    correctAnswer: 0
},

{
    id: 53,
    text: "Se la capacita' di un condensatore sferico (raggio interno r_i, raggio esterno r_e) e' identica a quella di una sfera conduttrice isolata, il raggio di quest'ultima:",
    options: ["(a) e' sempre compreso tra r_i ed r_e", "(b) e' sempre maggiore di r_e", "(c) puo' essere maggiore di r_e", "(d) puo' essere minore di r_i"],
    correctAnswer: 2
},

{
  id: 54,
  text: "Un piccolo volumetto τ di materiale dielettrico e' immerso in un campo elettrostatico E = α · x · u_y (α costante positiva) ed e' posto in x ≠ 0, y ≠ 0. La forza risultante sul volumetto:",
  options: ["(a) e' costante ed orientata lungo l'asse x", "(b) e' nulla", "(c) e' costante ed orientata lungo l'asse y", "(d) dipende linearmente da x ed e' orientata lungo l'asse x"],
  correctAnswer: 1
},

{
    id: 55,
    text: "Un generatore mantiene una differenza di potenziale costante ΔV = 1 mV tra la parete interna e la parete esterna di una sfera conduttrice cava, di raggio interno r_i = 2 mm, raggio esterno r_e = 3 mm e resistivita' ρ = 2 · 10^-3 Ωm. La corrente e':",
    options: ["(a) 0.038 A", "(b) 7.96 A", "(c) 1 A", "(d) 500 A"],
    correctAnswer: 0
},

{
    id: 56,
    text: "In condizioni stazionarie, il vettore densità di corrente j in un materiale conduttore, ha divergenza nulla. Cio' implica che:",
    options: ["(a) j ha distribuzione uniforme", "(b) il flusso di j attraverso una qualunque superficie e' sempre nullo, se la superficie e' chiusa", "(c) j ha modulo diverso da zero unicamente sulla superficie del materiale conduttore", "(d) il flusso di j attraverso una qualunque superficie e' sempre costante"],
    correctAnswer: 1
},

{
    id: 57,
    text: "Un solenoide a sezione circolare di area S e lunghezza d, avente N spire, e' collegato in serie ad una resistenza R e ad un generatore di tensione costante, dotato di interruttore. Questo circuito RL sara' caratterizzato da una extracorrente di chiusura avente costante di tempo T.",
    options: ["(a) μ₀N²SdR", "(b) R/μ₀N²Sd", "(c) μ₀N²S/Rd", "(d) μ₀N²Sd/R"],
    correctAnswer: 2
},

{
    id: 58,
    text: "Un solenoide indefinito, a sezione circolare di raggio R, e' percorso da una corrente oscillante nel tempo, con pulsazione ω. La circuitazione del campo elettrico indotto, calcolata lungo una circonferenza di raggio r e avente centro sull'asse del solenoide:",
    options: ["(a) e' costante nel tempo, se r > R", "(b) dipende linearmente da r se r < R", "(c) e' indipendente da r, se r > R", "(d) dipende linearmente da r se r > R"],
    correctAnswer: 2
},

{
  id: 59,
  text: "Un solenoide dotato di autoinduttanza L = 1 mH e' connesso con un generatore di f.e.m. alternata V(t) = V₀sin(ωt), con V₀ = 10 V, ω = 10 rad/s. Sapendo che il filo che costituisce il solenoide ha una resistenza elettrica R = 5 ohm, il valore massimo della f.e.m. indotta è:",
  options: ["(a) nessuno dei valori proposto è corretto", "(b) 20 mV", "(c) 40 mV", "(d) 10 mV"],
  correctAnswer: 2
},

{
  id: 60,
  text: "Un solenoide dotato di autoinduttanza L = 1 mH è connesso con un generatore di f.e.m. alternata V(t) = V₀sin(ωt), con V₀ = 10 V, ω = 10 rad/s. Sapendo che il filo che costituisce il solenoide ha una resistenza elettrica R = 5 ohm, il valore massimo della f.e.m. indotta è:",
  options: ["(a) nessuno dei valori proposto è corretto", "(b) 20 mV", "(c) 2 V", "(d) 20 μV", "(e) 9.2 mV"],
  correctAnswer: 0
},

{
  id: 61,
  text: "Due circuiti RC sono alimentati da due identici generatori di tensione continua ΔV ed hanno rispettivamente resistenza e capacità C₂ = 5 · C₁ e R₂ = 5 · R₁. Inizialmente i circuiti sono aperti ed all'istante t=0 vengono simultaneamente chiusi.",
  options: ["(a) all'istante t = 5R₁C₁, l'intensità di corrente che circola nel circuito 2 e' maggiore che nel circuito 1", "(b) all'istante di chiusura dell'interruttore, l'intensità di corrente che circola nel circuito 2 e' maggiore che nel circuito 1", "(c) all'istante di chiusura dell'interruttore, l'intensità di corrente che circola nei due circuiti e' identica e diversa da zero", "(d) all'istante t = R₁C₁/2, l'intensità di corrente che circola nel circuito 2 e' maggiore che nel circuito 1"],
  correctAnswer: 1
},

{
  id: 62,
  text: "La frequenza ciclotronica di una carica q = 3μC con massa m = 2 · 10⁻¹² Kg in moto circolare uniforme su di un piano immerso in un campo magnetico |B| = 0.15 T ad esso ortogonale e':",
  options: ["(a) 225 KHz", "(b) non e' calcolabile perché dipende dalla velocità della carica, che non e' data", "(c) non e' calcolabile perché dipende dal raggio di curvatura della traiettoria, che non e' dato", "(d) 358 KHz"],
  correctAnswer: 3
},

{
  id: 63,
  text: "Un solenoide di lunghezza L = 1 m è costituito di N = 5000 spire, ed è attraversato da una corrente i = 0,1 A. Il solenoide è riempito con un materiale diamagnetico avente suscettività magnetica χm = -2 · 10⁻³. Quanto vale il modulo del vettore Magnetizzazione?",
  options: ["(a) 1 Wb", "(b) 1 A/m", "(c) 1000 A/m", "(d) 1"],
  correctAnswer: 1
},

{
  id: 64,
  text: "Un solenoide rettilineo indefinito. A sezione circolare di raggio R è percorso da una corrente oscillante nel tempo con pulsazione ω in un generico punto dello spazio, il campo elettrostatico indotto",
  options: ["All'esterno del solenoide, ha modulo inversamente proporzionale alla distanza dell'asse del solenoide", "È non nullo solo all'esterno del solenoide", "È costante nel tempo", "Ha modulo inversamente proporzionale alla pulsazione ω"],
  correctAnswer: 0
},

{
    id: 65,
    text: "Il vettore induzione elettrica D può essere misurato come",
    options: ["C / m³", "N / (C · m²)", "N / (V · m)", "A / (s · m²)"],
    correctAnswer: 2
},

{
  id: 66,
  text: "Una sfera metallica cava (raggio interno R1, raggio esterno R2) ha la superficie esterna messa a terra. Al centro della sfera cava si trova una carica puntiforme + q. Il potenziale della sfera rispetto alla terra è",
  options: ["0", "+q / (4π-R₂)", "Non definibile univocamente poiché superficie interna e superficie esterna della sfera hanno potenziali diversi", "-q/(4π-R₂)"],
  correctAnswer: 0
},

{
    id: 67,
    text: "L'energia potenziale di un dipolo elettrico posto ad una certa distanza da una distribuzione lineare di carica uniforme e indefinitamente lunga è",
    options: ["Nulla se il momento di dipolo è parallelo alla distribuzione lineare di carica", "Massima e di valore positivo se il momento di dipolo è antiparallelo alla distribuzione lineare di carica", "Minima e di valore negativo se il momento di dipolo è parallelo alla distribuzione lineare di carica", "Nulla se il momento di dipolo è perpendicolare alla distribuzione lineare di carica"],
    correctAnswer: 3
},

{
    id: 68,
    text: "Un filo conduttore di rame di sezione circolare (diametro 1 mm) presenta una densità elettronica n = 10²⁹ elettroni / m³ ed è attraversato da una corrente I=100 A, sapendo che la carica elettronica è 'e' si calcoli la velocità di deriva dei portatori di carica",
    options: ["2 mm/s", "2,5 m/s", "8 mm/s", "2,5 mm/s"],
    correctAnswer: 3
},

{
  id: 69,
  text: "Un condensatore a facce piane parallele (superficie S, distanza d) ha una differenza di potenziale ΔV tra le armature ed è elettricamente isolato. La distanza tra le armature viene portata da d a d/2. In questa nuova condizione",
  options: ["La capacità del condensatore non è variata", "La densità di energia elettrostatica del sistema non è variata", "L'energia elettrostatica del condensatore non è variata", "La differenza di potenziale tra le armature non è variata"],
  correctAnswer: 2
},

{
    id: 70,
    text: "7. In un solido diamagnetico immerso in un campo magnetico stazionario, il momento magnetico che si forma a livello microscopico è",
    options: ["a. Indipendente dal campo magnetico esterno perché dovuto esclusivamente alla configurazione macroscopica del materiale", "b. Parallelo al campo magnetico esterno", "c. Perpendicolare al campo magnetico esterno", "d. Antiparallelo al campo magnetico esterno"],
    correctAnswer: 3
},

{
  id: 71,
  text: "8. Un cilindro dielettrico (raggio R=5 cm, lunghezza h=20 cm) avente costante dielettrica relativa εr = 3 ruota intorno al suo asse con velocità angolare costante ω = 5 · 10^4 rad / s. Il cilindro è immerso in un campo magnetico stazionario ed uniforme |B|=3 T orientato parallelamente all'asse del cilindro. Le cariche di polarizzazione sulla superficie del cilindro sono",
  options: ["a. 8,34 nC", "b. 0,199 μC", "c. Nulle perché il cilindro non si polarizza, considerato che non è presente alcun campo elettrico esterno", "d. 0,13 μC"],
  correctAnswer: 2
},

{
    id: 72,
    text: "9. In un condensatore sferico, la differenza di potenziale tra le armature varia nel tempo secondo una legge V(t) = V0 · cosωt. La densità di corrente di spostamento tra le armature",
    options: ["a. Ha modulo uniforme nello spazio", "b. Ha modulo indipendente dalla frequenza ω", "c. Ha modulo costante nel tempo", "d. È oscillante nel tempo con pulsazione ω"],
    correctAnswer: 3
},

{
  id: 73,
  text: "10. L'autoflusso del campo magnetico prodotto da un solenoide avente N=1500 spire di raggio r=2,5 mm lungo d=7 cm è percorso da corrente I=50 A è circa",
  options: ["a. 26 · 10^-6 H", "b. 26 · 10^-6 A · H", "c. 0,04 A · H", "d. 0,57 H"],
  correctAnswer: 0
},

{
    id: 74,
    text: "11. In uno spettrometro di massa, un primo ione con un dato rapporto carica massa q1/m1 compie una traiettoria caratterizzata da un raggio di curvatura r. Se si raddoppia la ddp ΔV e si dimezza il modulo del campo magnetico B quale rapporto carica massa q2/m2 dovrà avere un secondo ione per seguire una traiettoria col medesimo raggio di curvatura?",
    options: ["a. q2/m2 = 16·q1/m1", "b. q2/m2 = 8·q1/m1", "c. q2/m2 = 1/16·q1/m1", "d. q2/m2 = 1/8·q1/m1"],
    correctAnswer: 1
},

{
    id: 75,
text: "12. Un filo conduttore di sezione S = 3 mm^2 e lunghezza L = 5 m è costituito da un materiale diamagnetico avente resistività variabile lungo la lunghezza del filo ρ(x) = ρ0 + (ρ1 - ρ0) · x/L dove (ρ0 = 6 · 10^-8 Ω · m) e (ρ1 = 8 · 10^-8 Ω · m) ed i punti x=0 e x=L corrispondono agli estremi del filo. Per poter trasmettere una corrente stazionaria I = 3 A, la differenza di potenziale ai capi del filo dovrà essere circa:",
options: [
"(a) 0,12 V",
"(b) 0,30 V",
"(c) 0,35 V",
"(d) 0,40 V"
],
correctAnswer: 2
},
{
    id: 77,
    text: "13. In un’onda piana monocromatica polarizzata linearmente che si propaga nel vuoto, il campo elettrico ed il campo magnetico in un dato punto dello spazio",
    options: ["a. Oscillano sfasati di π/2", "b. Oscillano sfasati di −π", "c. Oscillano sfasati di −π/2", "d. Oscillano in fase"],
    correctAnswer: 3
},

{
    id: 76,
    text: "14. Una cella fotovoltaica in silicio copre una superficie A = 15cm² e produce una corrente I = 0,3 A ad una tensione di 0,5 V quando illuminata dalla luce solare. Supponendo che la luce solare si un’onda piana monocromatica polarizzata linearmente con ampiezza del campo elettrico E₀ = 1,5 · 10³V / m l’efficienza della cella fotovoltaica calcolata come rapporto della potenza elettrica erogata sulla potenza fornita dalla radiazione è circa",
    options: ["a. 3,35%", "b. 0,033%", "c. 1,67%", "d. 50%"],
    correctAnswer: 0
},

{
    id: 77,
    text: "15. Le armature di un condensatore a facce piane e parallele sono quadrate (lato L = 5 mm) e distanti h = 0,5 mm. Lo spazio tra le armature è completamente riempito con un dielettrico isotropo ed omogeneo di costante dielettrica relativa pari a 3. Il condensatore è carico ed isolato con una differenza di potenziale di 400 V tra le armature. Le cariche di polarizzazione sulle superfici del dielettrico a contatto con le armature metalliche sono",
    options: ["a. |21,24| μC", "b. |14,16| μC", "c. |0,53| nC", "d. |0,35| nC"],
    correctAnswer: 2
},

{
  id: 78,
  text: "Un cilindro conduttore e' costituito da due segmenti in contatto, come mostrato in figura. I due segmenti sono costituiti da materiali conduttori con resistivita' ρ₁ e ρ₂ rispettivamente. Nel cilindro scorre una corrente elettrica stazionaria, caratterizzata da un vettore densita' di corrente j uniforme. All'interfaccia di contatto tra i due materiali:",
  options: ["a. il campo elettrico e' continuo ma non nullo", "b. si produce una distribuzione di cariche confinate all'interfaccia, con densita' proporzionale alla differenza delle resistivita'", "c. il campo elettrico e' nullo", "d. si produce una distribuzione di cariche confinate all'interfaccia, con densita' proporzionale al rapporto delle resistivita'"],
  correctAnswer: 0
},

{
    id: 79,
    text: "In un materiale ferromagnetico, il vettore magnetizzazione M:",
    options: ["a. E' parallelo al vettore densita' superficiale di corrente amperiana j_m", "b. ha sempre lo stesso verso del campo magnetizzante H", "c. puo' essere uguale a zero anche in presenza di un campo magnetizzante H", "d. E' parallelo al vettore densita' lineare di corrente amperiana j_{a,m}"],
    correctAnswer: 2
},

{
  id: 80,
  text: "Si consideri una distribuzione lineare di carica avente lunghezza indefinita e densita' lineare λ costante. Date due superfici cilindriche coassiali alla distribuzione lineare di carica, aventi altezze h₁ ed h₂ = 4 · h₁ rispettivamente, e raggi di base R₁ ed R₂ = ½ · R₁ rispettivamente, i flussi Φ₁ e Φ₂ di campo elettrostatico attraverso le due superfici cilindriche sono tali per cui:",
  options: ["a. Φ₂ = ½Φ₁", "b. Φ₂ = 4Φ₁", "c. Φ₂ = 2Φ₁", "d. Φ₂ = Φ₁"],
  correctAnswer: 1
},

{
  id: 81,
  text: "Data un'onda elettromagnetica piana, monocromatica:",
  options: ["a. se la frequenza viene raddoppiata, la lunghezza d'onda raddoppia", "b. se la pulsazione viene raddoppiata, la velocita' di propagazione raddoppia", "c. se la frequenza viene raddoppiata, il numero d'onda raddoppia", "d. lunghezza d'onda e numero d'onda sono indipendenti dalla frequenza"],
  correctAnswer: 2
},

{
    id: 82,
    text: "Una bacchetta conduttrice si muove con velocit\u00e0 costante scorrendo senza attrito su due fili conduttori paralleli. I fili conduttori fanno parte di un circuito di resistenza R. Il circuito si trova in una regione di spazio interessata da un campo magnetico uniforme, orientato perpendicolarmente al piano del circuito stesso, come mostrato in figura. Quale affermazione \u00e8 corretta.",
    options: ["a. la forza esterna necessaria per mantenere la bacchetta a velocit\u00e0 costante e' direttamente proporzionale alla velocit\u00e0 stessa", "b. la corrente indotta nella bacchetta scorre in un verso che non dipende dall'orientazione del campo magnetico", "c. compare una forza di natura elettromagnetica che agisce sul moto della bacchetta ed e' direttamente proporzionale alla resistenza R", "d. compare una forza di natura elettromagnetica che agisce sul moto della bacchetta e cambia di verso se il campo magnetico cambia di verso"],
    correctAnswer: 3
},

{
    id: 83,
    text: "Si consideri un condensatore a facce piane e parallele la cui differenza di potenziale tra le armature varia armonicamente nel tempo con pulsazione ω₀. Quali tra le seguenti affermazioni e' corretta:",
    options: ["a. Viene prodotto un campo magnetico oscillante B, limitatamente alla regione di spazio compresa tra le armature del condensatore", "b. Viene prodotto un campo magnetico oscillante B il cui modulo puo' variare nello spazio ✓", "c. Viene prodotto un campo magnetico oscillante B, la cui divergenza puo' essere diversa da zero", "d. Viene prodotto un campo magnetico oscillante B, in fase con la differenza di potenziale tra le armature"],
    correctAnswer: 1
},

{
    id: 84,
    text: "Secondo il modello di Drude, in un conduttore, la resistività:",
    options: ["a. cresce al crescere della densità volumica dei portatori di carica", "b. cresce al crescere della massa dei portatori di carica", "c. cresce al crescere del tempo medio che intercorre tra due urti successivi tra i portatori di carica", "d. cresce al crescere della carica elettrica dei portatori di carica"],
    correctAnswer: 2
},

{
    id: 85,
    text: "I due circuiti in figura (C₂=5C₁ e R₂=5R₁) hanno generatori di tensione (ideali) identici, che forniscono una forza elettromotrice costante ΔV. Inizialmente, i due circuiti sono aperti, ed all'istante t=0 vengono chiusi simultaneamente. Quale delle seguenti affermazioni e' corretta?",
    options: [
        "a. all'istante t = 0, l'intensità di corrente nei due circuiti e' identica e diversa da 0",
        "b. all'istante t = 0, l'intensità di corrente nei due circuiti e' identica e pari a 0",
        "c. all'istante t = 4R₁C₁, l'intensità di corrente nel circuito 1 (a sinistra) e' minore dell'intensità di corrente nel circuito 2 (a destra)",
        "d. all'istante t = 0, l'intensità di corrente nel circuito 1 (a sinistra) e' minore dell'intensità di corrente nel circuito 2 (a destra)"
    ],
    correctAnswer: 2
},

{
  id: 86,
  text: "Un cilindro dielettrico (raggio R=5 cm, altezza a=10 cm), di costante dielettrica relativa εr = 2.5 ruota intorno al suo asse con velocita' angolare costante ω = 3 · 10^3 rad/s. Il cilindro e' immerso in un campo magnetico uniforme di modulo B=0.2 T, orientato parallelamente all'asse del cilindro. Il valore assoluto della carica di polarizzazione sulla superficie laterale del cilindro e' di circa: (si ricorda che ε0 = 8.85 · 10^-12 C^2 N^-1 m^-2)",
  options: ["a. 1.25 · 10^-2 nC", "b. 2.8 · 10^-3 nC", "c. 0 C", "d. 2.08 · 10^-2 nC"],
  correctAnswer: 2
},

{
  id: 87,
  text: "Due solenoidi lineari, coassiali di pari lunghezza, aventi N₁ ed N₂ > N₁ spire circolari rispettivamente di raggi r₁ ed r₂ < r₁ sono attraversati dalle correnti I₁ e I₂. Il coefficiente di mutua induzione:",
  options: ["a. e' nullo se I₁ = 0 oppure I₂ = 0", "b. non dipende da r₁", "c. e' proporzionale a r₁² · r₂²", "d. non dipende da r₂"],
  correctAnswer: 0
},

{
  id: 88,
  text: "Una sottile bacchetta di vetro di sezione trascurabile e lunghezza d e' uniformemente carica con una carica Q. Inoltre, la bacchetta ruota attorno ad un suo estremo, con velocita' angolare ω costante. Quale delle seguenti affermazioni e' vera.",
  options: [
    "a. Alla bacchetta puo' essere associato un momento di dipolo magnetico di modulo pari a m = Qωd² / 24",
    "b. Alla bacchetta puo' essere associato un momento di dipolo magnetico di modulo nullo",
    "c. Alla bacchetta puo' essere associato un momento di dipolo magnetico di modulo pari a m = Qωd³ / 6",
    "d. Alla bacchetta puo' essere associato un momento di dipolo magnetico di modulo pari a m = Qωd¹ / 2"
  ],
  correctAnswer: 1
},

{
    id: 89,
    text: "L'energia potenziale magnetica della spira in figura si puo' esprimere come:",
    options: [
        "-μ₀ * I₁ * I₂ / (2π) * a * log(d+b)/d",
        "-μ₀ * I₁ * I₂ / (2π) * ab/d",
        "μ₀ * I₁ * I₂ / (2π) * ab/d",
        "μ₀ * I₁ * I₂ / (2π) * a * log(d-b)/d"
    ],
    correctAnswer: 0
},

{
    id: 90,
    text: "Il vettore di Poynting associato ad un'onda elettromagnetica sferica, monocromatica, che si propaga nel vuoto:",
    options: ["a. ha orientazione radiale ed ampiezza decrescente come 1/r, dove r e' la distanza dall'origine", "b. ha orientazione radiale ed ampiezza decrescente come 1/r^2, dove r e' la distanza dall'origine", "c. e' uniforme nello spazio", "d. ha orientazione radiale ed ampiezza costante"],
    correctAnswer: 1
},

{
    id: 91,
    text: "Una sfera metallica cava (raggio interno R1, raggio esterno R2) e' neutra ed isolata. Al centro della sfera cava si trova una carica puntiforme +q. Il potenziale della sfera rispetto alla terra e':",
    options: ["(a) 0", "(b) +q/(4πε₀·R₂) ma solo sulla superficie, perché per R₁ < r < R₂ il potenziale non e' costante", "(c) +q/(4πε₀·R₂)", "(d) non definibile univocamente, poiché superficie interna e superficie esterna della sfera hanno potenziali di segno opposto"],
    correctAnswer: 2
},

{
    id: 92,
    text: "Data una distribuzione cilindrica di carica con densita' volumica ρ, detta r la distanza dal suo asse:",
    options: ["(a) si produce un campo elettrostatico di modulo direttamente proporzionale a r all'interno del cilindro e decrescente come r⁻² al di fuori", "(b) si produce un campo elettrostatico di modulo costante all'interno del cilindro e decrescente come r⁻² al di fuori", "(c) si produce un campo elettrostatico di modulo costante all'interno del cilindro e decrescente come r⁻¹ al di fuori", "(d) si produce un campo elettrostatico di modulo direttamente proporzionale a r all'interno del cilindro e decrescente come r⁻¹ al di fuori"],
    correctAnswer: 0
},

{
  id: 93,
  text: "Il vettore induzione elettrica D puo' essere misurato come:",
  options: ["(a) N/C", "(b) N/(Ω·A·m)", "(c) V/m", "(d) A/m²"],
  correctAnswer: 0
},

{
    id: 94,
    text: "Una carica q = 0.1mC e' uniformemente distribuita su una superficie sferica di raggio R = 4mm. Sapendo che ε₀ = 8.85·10⁻¹²F/m, l'energia elettrostatica associata a tale distribuzione di carica e':",
    options: ["(a) nessuna delle soluzioni proposte e' corretta", "(b) circa 22.5 kJ", "(c) circa 11.2 kJ", "(d) circa 2.81 MJ"],
    correctAnswer: 2
},

{
    id: 95,
    text: "L'energia elettrostatica contenuta in un condensatore sferico di raggio interno r_i = 1mm e raggio esterno r_e = 1.1mm, a cui viene applicata una ddp ΔV = 2V e' (ε_0 = 8.85 · 10^{-12} F/m):",
    options: ["(a) circa 2.45 · 10^{-12} J", "(b) circa 4.89 · 10^{-12} J", "(c) circa 2.22 · 10^{-9} J", "(d) circa 1.22 · 10^{-12} J"],
    correctAnswer: 0
},

{
    id: 96,
    text: "Ricordando che μ₀ = 4π · 10⁻⁷ H/m, il coefficiente di auto induzione di un solenoide rettilineo a sezione circolare di raggio r = 0.5 mm e lungo L = 1.3 cm, dotato di N = 400 spire e':",
    options: ["(a) circa 0.934 mH", "(b) circa 2.05 nH", "(c) circa 30.37 nH", "(d) circa 0.012 mH"],
    correctAnswer: 3
},

{
  id: 97,
  text: "La forza risultante su di una bobina circolare, con N avvolgimenti, percorsa da corrente ed immersa in un campo magnetico statico, non nullo, trascurando eventuali effetti induttivi:",
  options: ["(a) e' nulla se e solo se la corrente che circola nella bobina e' nulla", "(b) se diversa da zero, il suo modulo non dipende dal numero di avvolgimenti N", "(c) e' massima, in modulo, quando e' massimo il valore assoluto del flusso del campo magnetico attraverso la bobina", "(d) e' nulla se il campo magnetico e' uniforme"],
  correctAnswer: 0
},

{
  id: 98,
  text: "Il campo magnetizzante H puo' essere misurato come:",
  options: ["(a) T", "(b) N/(A · m)", "(c) T/m", "(d) C/(s · m)"],
  correctAnswer: 1
},

{
  id: 99,
  text: "Un solenoide rettilineo indefinito, a sezione circolare di raggio R, e' percorso da una corrente oscillante nel tempo, con pulsazione ω. In un generico punto dello spazio, il campo elettrico indotto:",
  options: ["(a) ha modulo inversamente proporzionale alla pulsazione ω", "(b) e' costante nel tempo", "(c) e' nullo all'esterno del solenoide", "(d) all'esterno del solenoide, ha modulo inversamente proporzionale alla distanza dall'asse del solenoide"],
  correctAnswer: 3
},

{
    id: 100,
    text: "Un condensatore a facce piane e parallele, avente le armature di forma circolare e' alimentato da una f.e.m. oscillante. Quale tra queste affermazioni e' corretta:",
    options: [
        " (a) l'ampiezza del campo magnetico nello spazio tra le due armature e' nulla poiche' non c'e' passaggio di corrente",
        " (b) l'ampiezza del campo magnetico nello spazio tra le due armature decresce mano a mano che ci si allontana dall'asse del condensatore",
        " (c) il campo magnetico e' oscillante ed in fase con la f.e.m.",
        " (d) il campo magnetico e' oscillante e sfasato di ±π/2 rispetto alla f.e.m."
    ],
    correctAnswer: 3
},

{
  id: 101,
  text: "In una particella di massa m, con una forza F applicata, la velocità è v. La forza F è data da: F = ma, dove a è l'accelerazione. Se la particella ha massa m e velocità v, quale delle seguenti espressioni rappresenta correttamente la forza F?",
  options: ["F = mv", "F = m/v", "F = mv²", "F = m/v²"],
  correctAnswer: 3
},

{
    id: 102,
    text: "Lungo una circonferenza di raggio R, posta sul piano xy, vi è una distribuzione di carica la cui densità lineare è descritta da λ(θ) = λ₀ sin(θ) dove θ è l'angolo tra un generico raggio vettore e l'asse y. Quale delle seguenti affermazioni è vera:",
    options: [
        "a. in qualunque punto del piano xy, all'interno della circonferenza, il campo elettrostatico ha componente x nulla",
        "b. in qualunque punto del piano xy, all'interno della circonferenza, il campo elettrostatico ha componente y nulla",
        "c. al centro della circonferenza, il campo elettrostatico ha modulo nullo",
        "d. il campo elettrostatico ha componente y nulla al centro della circonferenza"
    ],
    correctAnswer: 2
},

{
    id: 103,
    text: "Un materiale ferromagnetico di forma sferica e' stato magnetizzato in modo da avere una distribuzione del vettore magnetizzazione M uniforme, lungo una direzione prefissata. Quale affermazione e' corretta:",
    options: ["a. Tutte le altre affermazioni sono errate", "b. Non e' possibile associare un momento di dipolo magnetico complessivo al materiale, a causa della sua forma sferica", "c. Il momento di dipolo magnetico complessivo del materiale e' nullo, a causa della sua forma sferica", "d. Il momento di dipolo magnetico complessivo del materiale e' non nullo ed ha la stessa orientazione del vettore magnetizzazione M"],
    correctAnswer: 3
},

{
  id: 104,
  text: "Un'onda e.m., piana, monocromatica, polarizzata linearmente, incide perpendicolarmente su di una placchetta di materiale perfettamente assorbente, avente area pari a S = 1 cm², massa e spessore trascurabili. La placchetta è collegata all'estremità di una molla di costante elastica k = 25 N/m. L'altra estremità della molla è saldamente vincolata in modo da non potersi muovere. Se l'onda ha intensità I = 60 W/m², la deformazione della molla causata dall'onda e.m. è:",
  options: ["a. 0.4 mm", "b. 8 mm", "c. 0.8 mm", "d. 0 m"],
  correctAnswer: 3
},

{
    id: 105,
    text: "Due condensatori di identica geometria sono collegati a due generatori (identici) di tensione continua, ma mentre un condensatore opera nel vuoto, l'altro è completamente immerso in una camera in cui è presente un gas, di costante dielettrica relativa εr. A caricamento completato, i due condensatori vengono disconnessi dai rispettivi generatori, restando isolati. Le due armature di ciascun condensatore risentono di una forza attrattiva. Quale affermazione è corretta:",
    options: ["a. La forza attrattiva è minore nel caso del condensatore immerso nel gas", "b. La forza attrattiva è maggiore di un fattore εr² nel caso del condensatore immerso nel gas", "c. La forza attrattiva è identica nei due condensatori", "d. La forza attrattiva è maggiore di un fattore εr nel caso del condensatore immerso nel gas"],
    correctAnswer: 3
},

{
  id: 106,
  text: "Un solenoide rettilineo, a sezione circolare di raggio R, con N avvolgimenti e di lunghezza d è percorso da una corrente stazionaria I. Quale tra le seguenti affermazioni è corretta:",
  options: ["a. Se la lunghezza d raddoppia, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide raddoppia", "b. Se la corrente circolante I raddoppia, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide raddoppia", "c. Se il numero di avvolgimenti N raddoppia, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide raddoppia", "d. Se il numero di avvolgimenti N raddoppia, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide quadruplica"],
  correctAnswer: 3
},

{
    id: 107,
    text: "Un solenoide rettilineo, a sezione circolare di raggio R, con N avvolgimenti e di lunghezza d e percorso da una corrente stazionaria I. Quale tra le seguenti affermazioni e' corretta:",
    options: [
        "a. Se la lunghezza d raddoppia, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide raddoppia",
        "b. Se la corrente circolante I raddoppia, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide raddoppia",
        "c. Se il numero di avvolgimenti N raddoppia, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide raddoppia",
        "d. Se la lunghezza d si dimezza, lasciando invariati tutti gli altri parametri geometrici, l'induttanza del solenoide raddoppia"
    ],
    correctAnswer: 3
},

{
  id: 108,
  text: "Un'onda elettromagnetica piana, monocratica, polarizzata linearmente che si propaga nel vuoto, ha un campo elettrico che può essere descritto dalla seguente espressione: E = E₀ · sin(3.4313 · 10⁶ · x + 2.4026 · 10⁶ · y - ωt) · uₑ dove x e y vanno espresse in metri, ω in rad/s, E₀ in V/m e t in secondi.",
  options: ["a. la sua lunghezza d'onda e' 2.2 mm", "b. la sua lunghezza d'onda e' 1.5 μm", "c. la sua lunghezza d'onda e' 1.4 cm", "d. la sua lunghezza d'onda non e' determinabile se non si specifica ω"],
  correctAnswer: 3
},

{
    id: 109,
    text: "In un circuito RL (R = 15Ω, L = 4H) alimentato da un generatore di tensione continua (ΔV = 25V), l'energia totale associata al campo magnetico, contabilizzata a partire dall'istante di chiusura circuito e':",
    options: ["a. 11,11 J", "b. 83,33 J", "c. 5,55 J", "d. 3,33 J"],
    correctAnswer: 2
},

{
  id: 110,
  text: "Il vettore di Poynting associato ad un'onda e.m. piana e polarizzata circolarmente:",
  options: ["a. si misura in J/m²", "b. è costante nello spazio e nel tempo", "c. ruota continuamente su piani perpendicolari alla direzione di propagazione dell'onda", "d. inverte il verso ogni semi-periodo di oscillazione del campo elettrico (o del campo magnetico)"],
  correctAnswer: 2
},

{
  id: 111,
  text: "Per far passare una corrente di 2 A attraverso un filo conduttore di resistività ρ = 6 · 10⁻⁸ Ωm, sezione S = 2 mm² e lunghezza L = 3 m e' necessario applicare una ddp pari a:",
  options: ["a. 90 mV", "b. 180 mV", "c. 4 · 10⁻¹⁴ V", "d. 8 · 10⁻¹⁴ V"],
  correctAnswer: 0
},

{
    id: 112,
    text: "Lungo una circonferenza di raggio R, posta sul piano xy, vi e' una distribuzione di carica la cui densita' lineare e' descritta da λ(θ) = λ₀ · sin(θ) dove θ e' l'angolo tra un generico raggio vettore e l'asse y. Quale delle seguenti affermazioni e' vera:",
    options: ["a. in qualunque punto del piano xy, all'interno della circonferenza, il campo elettrostatico ha componente x nulla", "b. in qualunque punto del piano xy, all'interno della circonferenza, il campo elettrostatico ha componente y nulla", "c. al centro della circonferenza, il campo elettrostatico ha modulo nullo", "d. il campo elettrostatico ha componente y nulla al centro della circonferenza"],
    correctAnswer: 2
},

{
    id: 113,
    text: "Una spira conduttrice quadrata di lato L, percorsa da corrente stazionaria I, e' vincolata a restare adagiata su di un piano xy. Nel piano xy e' presente un campo magnetico di modulo B = A · (x² + y²) con A costante. Il campo B e' parallelo all'asse z (ovvero parallelo a u_z) e quindi ortogonale al piano xy. Tenendo a mente che la spira non puo' ruotare fuori dal piano xy, quale affermazione e' corretta:",
    options: [
        "a. Qualunque sia la posizione della spira sul piano xy, su di essa agisce una forza compressiva non-nulla, perch'e' il campo magnetico B e' non-uniforme",
        "b. Qualunque sia la posizione della spira sul piano xy, su di essa agisce una forza compressiva nulla, perch'e' la spira possiede un momento di dipolo magnetico parallelo o antiparallelo al campo magnetico B",
        "c. La spira ha un'unica posizione di equilibrio",
        "d. Qualunque sia la posizione della spira sul piano xy, su di essa agisce una forza compressiva nulla, perch'e' il campo magnetico B non varia nel tempo"
    ],
    correctAnswer: 1
},

{
  id: 114,
  text: "Il vettore di Poynting associato ad un'onda e.m. piana e polarizzata circolarmente:",
  options: ["a. si misura in J/m²", "b. e' costante nello spazio e nel tempo", "c. ruota continuamente in piani perpendicolari alla direzione di propagazione dell'onda", "d. inverte il verso ogni semi-periodo di oscillazione del campo elettrico (o del campo magnetico)"],
  correctAnswer: 2
},

{
    id: 115,
    text: "Due spire conduttrici (spira 1, a sinistra, spira 2, a destra nel disegno) sono immerse in un campo magnetico uniforme B. Esse ruotano a velocità angolari costanti, rispettivamente a ω e 2ω, come mostrato in figura. Le sezioni dei fili che costituiscono le spire, e le loro resistività sono identiche. Le correnti indotte I₁ e I₂ nelle due spire sono tali per cui:",
    options: ["a. ||I₁||/||I₂|| = 0.375", "b. ||I₁||/||I₂|| = 0.75", "c. ||I₁||/||I₂|| = 0.5", "d. ||I₁||/||I₂|| = 0.25"],
    correctAnswer: 2
},

{
  id: 116,
  text: "Per far passare una corrente di 2 A attraverso un filo conduttore di resistività ρ = 6 · 10⁻⁸ Ωm, sezione S = 2 mm² e lunghezza L = 3 m e' necessario applicare una ddp pari a:",
  options: ["a. 90 mV", "b. 180 mV", "c. 4 · 10⁻¹⁴ V", "d. 8 · 10⁻¹⁴ V"],
  correctAnswer: 1
},

{
    id: 117,
    text: "In un dielettrico attraversato da un’onda elettromagnetica piana e monocromatica, il valore istantaneo del vettore polarizzazione P:",
    options: [
        "Ha una differenza di fase di π rad rispetto al campo elettrico incidente per qualunque frequenza di oscillazione dell’onda",
        "Ha una differenza di fase di 0 rad rispetto al campo elettrico incidente per qualunque frequenza di oscillazione dell’onda",
        "Ha una differenza di fase che varia da -π/2rad a +π/2rad rispetto al campo elettrico incidente, a seconda della frequenza di oscillazione dell’onda",
        "Ha una differenza di fase di |π/2| rad rispetto al campo elettrico incidente per qualunque frequenza di oscillazione dell’onda"
    ],
    correctAnswer: 2
},

{
  id: 118,
  text: "Una cella fotovoltaica in silicio copre una superficie A = 1.5 m² e produce una corrente I=0.5 A ad una tensione di 4 V quando illuminata dalla luce solare. Supponendo che la luce solare sia un'onda piana monocromatica, polarizzata linearmente, con ampiezza del campo elettrico E₀ = 30V/m, l'efficienza della cella fotovoltaica, calcolata come rapporto della potenza elettrica erogata sulla potenza fornita dalla radiazione è circa (ε₀ = 8.85 · 10⁻¹² F/m, μ₀ = 4π · 10⁻⁷ H/m):",
  options: ["(a) 3.35%", "(b) 0.033%", "(c) la situazione non è realizzabile", "(d) 89.61%"],
  correctAnswer: 2
},

{
    id: 119,
    text: "In due circuiti resistivi circolano rispettivamente le correnti stazionarie I₁ e I₂. Detto M il coefficiente di mutua induzione dei due circuiti:",
    options: ["(a) Il flusso del campo magnetico generato dal primo circuito, calcolato attraverso il secondo circuito è indipendente da M", "(b) Il flusso del campo magnetico generato dal primo circuito, calcolato attraverso il secondo circuito è inversamente proporzionale a M", "(c) Il flusso del campo magnetico generato dal primo circuito, calcolato attraverso il primo circuito è indipendente da M", "(d) M aumenta se aumentano le correnti circolanti nei due circuiti"],
    correctAnswer: 2
},

{
    id: 120,
    text: "Un solido diamagnetico immerso in un campo magnetico stazionario, il momento di dipolo magnetico che si forma a livello microscopico è:",
    options: ["(a) Indipendente dal campo magnetico esterno, perché dovuto esclusivamente alla configurazione microscopica del materiale", "(b) Parallelo al campo magnetico esterno", "(c) Perpendicolare al campo magnetico esterno", "(d) Localmente nullo se il campo magnetico esterno è nullo"],
    correctAnswer: 3
},

{
  id: 121,
  text: "Un cilindro dielettrico (raggio R= 5 cm, lunghezza h= 20 cm), avente costante dielettrica relativa εᵣ = 3 ruota attorno al suo asse con velocità angolare costante ω = 5 · 10⁴ rad/s. Il cilindro è immerso in un campo magnetico stazionario ed uniforme |B| = 3 T orientato parallelamente all'asse del cilindro. Le cariche di polarizzazione sulla superficie del cilindro sono:",
  options: ["(a) 0.199 μC", "(b) 0.13 μC", "(c) 0.25 μC", "(d) 0.08 μC"],
  correctAnswer: 0
},

{
  id: 122,
  text: "Domanda 9\nIn uno spettrometro di massa, un primo ione con un dato rapporto carica/massa q1/m1 compie una traiettoria caratterizzata da un raggio di curvatura r. Se si raddoppia la ddp ΔV, quale rapporto carica massa q2/m2 dovrà avere un secondo ione per seguire una traiettoria col medesimo raggio di curvatura?",
  options: ["(a) q2/m2 = 2 · q1/m2", "(b) q2/m2 = 8 · q1/m2", "(c) q2/m2 = 1/8 · q1/m2", "(d) q2/m2 = 1/2 · q1/m2"],
  correctAnswer: 2
},

{
    id: 123,
    text: "Domanda 10\nUna prima distribuzione sferica di carica ha raggio r1 = 3mm ed ospita sulla superficie una carica q1. Una seconda distribuzione sferica di carica ha raggio r2 = 6mm ed ospita sulla superficie una carica q2. La distanza tra i centri delle due distribuzioni sferiche è R = 10mm. Il potenziale ad una distanza d = 2mm dal centro della prima distribuzione sferica è nullo. Quindi:",
    options: ["(a) q2 = 8/3 · q1", "(b) q1 = -3/8 · q2", "(c) q2 = 4 · q1", "(d) q1 = -1/4 · q2"],
    correctAnswer: 3
},

{
    id: 124,
    text: "Domanda 11\nIl coefficiente di auto induzione di un solenoide rettilineo a sezione circolare di raggio r = 1mm e lungo L = 10cm, dotato di N = 2000 spire e percorso da una corrente I = 3A è:",
    options: ["(a) Circa 1.6 mH", "(b) Circa 79 nH", "(c) Circa 0.16 mH", "(d) Circa 0.47 mH"],
    correctAnswer: 3
},

{
  id: 125,
  text: "Domanda 12\nLa forza risultante su di una bobina circolare, con N avvolgimenti, percorsa da corrente stazionaria ed immersa in un campo magnetico B ≠ 0 statico, trascurando eventuali effetti induttivi:",
  options: ["(a) Se diversa da zero, è orientata sempre ortogonalmente al campo B", "(b) È sempre nulla se il campo magnetico è uniforme", "(c) Dipende dalla geometria e dall'orientamento della bobina rispetto al campo", "(d) È proporzionale al prodotto tra il numero di avvolgimenti, la corrente e l'area della bobina"],
  correctAnswer: 1
},

{
    id: 126,
    text: "Domanda 13\nUn cilindro conduttore cavo, di spessore trascurabile, altezza infinita e raggio a della base circolare, presenta una carica distribuita sulla superficie laterale. Il modulo del campo elettrostatico generato alla distanza r dall'asse del cilindro è:",
    options: ["(a) Costante, diverso da zero per r < a e direttamente proporzionale ad r per r > a", "(b) Nullo per r < a e inversamente proporzionale a r per r > a", "(c) Inversamente proporzionale a r per r < a e inversamente proporzionale ad r² per r > a", "(d) Nullo per r < a e inversamente proporzionale a r² per r > a"],
    correctAnswer: 2
},

{
  id: 127,
  text: "Domanda 14\nUn primo dielettrico ha indice di rifrazione n₁ = 1 ed un secondo dielettrico ha indice di rifrazione n₂ = 1.5. I due dielettrici sono in reciproco contatto lungo un'interfaccia planare e sono immersi in un campo elettrostatico. Si consideri il campo elettrostatico all'interfaccia: se E₁ è il campo nel primo dielettrico ed è orientato ad un angolo θ₁ = 30° rispetto alla normale all'interfaccia, quale sarà l'angolo θ₂ con cui è orientato il campo E₂ (rispetto alla normale all'interfaccia) nel secondo dielettrico?",
  options: ["(a) 40.89°", "(b) 37.59°", "(c) 49.1°", "(d) 52.41°"],
  correctAnswer: 1
},

{
  id: 128,
  text: "Domanda 15\nUna carica q = 0.3 mC è uniformemente distribuita su una superficie sferica di raggio R = 5mm. L'energia elettrostatica associata a tale distribuzione di carica è:",
  options: ["(a) Circa 40 kJ", "(b) Circa 162 kJ", "(c) Circa 81 kJ", "(d) Nessuna delle soluzioni proposte è corretta"],
  correctAnswer: 1
},

{
  id: 129,
  text: "Per far passare una corrente di 2.5 A attraverso un filo conduttore di resistivita' ρ = 4 · 10⁻⁷ Ωm, sezione S = 5 mm² e lunghezza L =",
  options: ["a. 25 · 10⁻¹³ V", "b. 0.4 V", "c. 10⁻⁸ V", "d. 0.4 mV"],
  correctAnswer: 1
},

{
    id: 130,
    text: "Il vettore di Poynting associato ad un'onda e.m. piana e polarizzata circolarmente:",
    options: ["a. si misura in J/m²", "b. ruota continuamente su piani perpendicolari alla direzione di propagazione dell'onda", "c. e' costante nello spazio e nel tempo", "d. inverte il verso ogni semi-periodo di oscillazione del campo elettrico (o del campo magnetico)"],
    correctAnswer: 1
},

{
    id: 131,
    text: "Un'onda piana, monocromatica, che si propaga nella direzione dell'asse x:",
    options: [
        "a. non puo' avere associato un campo magnetico oscillante, orientato nella direzione y",
        "b. non puo' avere associato un campo magnetico oscillante, orientato nella direzione z",
        "c. non puo' avere associato un campo elettrico oscillante, orientato nella direzione x",
        "d. non puo' avere associato un campo elettrico oscillante, orientato nella direzione y"
    ],
    correctAnswer: 2
},

{
    id: 132,
    text: "Un cilindro cavo conduttore (raggio interno r_i, raggio esterno r_e, lunghezza indefinita) e' percorso da una corrente stazionaria che scorre parallelamente al suo asse. Il campo magnetico prodotto dalla corrente:",
    options: ["a. ha modulo uniforme, non nullo, all'interno del materiale conduttore (cioe' per r_i < r < r_e)", "b. ha modulo uniforme, non nullo, all'esterno del conduttore (cioe' per r > r_e)", "c. e' nullo all'interno della parte cava del cilindro conduttore (cioe' per r < r_i) ✓", "d. e' nullo all'interno del materiale conduttore (cioe' per r_i < r < r_e)"],
    correctAnswer: 2
},

{
  id: 133,
  text: "Vengono dati due solenoidi rettilinei a sezione circolare. Il primo solenoide ha sezione con raggio R₁ e densita' lineare di spire n₁. Il secondo solenoide ha sezione con raggio R₂ e densita' lineare di spire n₂. Entrambi i solenoidi sono molto lunghi rispetto alle loro dimensioni trasversali ed hanno medesima lunghezza d. Inoltre, sono disposti coassialmente uno rispetto all'altro. Nei due solenoidi circolano rispettivamente le correnti I₁ ed I₂. Quale delle seguenti affermazioni e' vera:",
  options: [
    "a. Il flusso del campo magnetico generato dal primo solenoide, calcolato attraverso il secondo solenoide e' uguale al flusso del campo magnetico generato dal secondo solenoide, calcolato attraverso il primo solenoide solamente se I₁ = I₂.",
    "b. Tutte le altre affermazioni sono errate",
    "c. Il flusso del campo magnetico generato dal primo solenoide, calcolato attraverso il secondo solenoide e' uguale al flusso del campo magnetico generato dal secondo solenoide, calcolato attraverso il primo solenoide solamente se R₁ = R₂.",
    "d. Il flusso del campo magnetico generato dal primo solenoide, calcolato attraverso il secondo solenoide e' uguale al flusso del campo magnetico generato dal secondo solenoide, calcolato attraverso il primo solenoide solamente se n₁ = n₂."
  ],
  correctAnswer: 1
},

{
    id: 134,
    text: "In un circuito RL (R = 10Ω, L = 2H) alimentato da un generatore di tensione continua (ΔV = 15V), l'energia totale associata al campo magnetico, contabilizzata dopo un tempo infinito a partire dall'istante di chiusura circuito e':",
    options: ["a. 3.375 J", "b. 4.5 J", "c. 2.25 J", "d. 6.75 J"],
    correctAnswer: 2
},

{
    id: 135,
    text: "Si consideri un condensatore a facce piane e parallele in fase di caricamento, grazie ad un generatore di tensione continua collegato Quali tra le seguenti affermazioni e' corretta:",
    options: ["a. Nello spazio tra le armature il modulo del campo magnetico e' crescente nel tempo", "b. Nello spazio tra le armature il modulo del campo magnetico e' sempre nullo", "c. Nello spazio tra le armature il modulo del campo magnetico e' decrescente nel tempo", "d. Nello spazio tra le armature, il modulo del campo elettrico e' decrescente nel tempo"],
    correctAnswer: 1
},

{
    id: 136,
    text: "Dato un condensatore cilindrico (raggio interno R_i, raggio esterno R_e, altezza h), caricato con una carica Q non nulla, e poi isolato:",
    options: [
        "a. la densita' di energia elettrostatica nello spazio tra le armature scala come 1/r^2, dove r e' la distanza dall'asse del condensatore",
        "b. il campo elettrostatico nello spazio tra le armature scala come 1/r^2, dove r e' la distanza dall'asse del condensatore",
        "c. la densita' di energia elettrostatica nello spazio tra le armature scala come 1/r, dove r e' la distanza dall'asse del condensatore",
        "d. la densita' di energia elettrostatica e' costante nello spazio tra le armature cilindriche"
    ],
    correctAnswer: 0
},

{
    id: 137,
    text: "Un dipolo elettrico, avente momento |p|=2·10⁻¹² C·m e' collocato ad una distanza r=4 mm da una distribuzione lineare (rettilinea) di carica, con densita' λ = 3·10⁻² C/m e lunghezza indefinita. Quale delle seguenti affermazioni e' corretta (ε₀ = 8.85·10⁻¹² F/m).",
    options: [
        "a. Se il dipolo e' orientato parallelamente alla distribuzione rettilinea di carica, la sua energia potenziale elettrostatica e', in valore assoluto, circa 0.85 J",
        "b. Se il dipolo e' orientato parallelamente alla distribuzione rettilinea di carica, la sua energia potenziale elettrostatica e' nulla",
        "c. L'energia potenziale elettrostatica del dipolo non e' mai essere negativa, qualunque sia l'orientazione del dipolo rispetto alla distribuzione rettilinea di carica",
        "d. Se il dipolo e' orientato parallelamente alla distribuzione rettilinea di carica, la sua energia potenziale elettrostatica e', in valore assoluto, circa 0.27 J"
    ],
    correctAnswer: 1
},

{
    id: 138,
    text: "Secondo il modello di Drude, in un conduttore, la resistivita':",
    options: ["a. cresce al crescere della carica elettrica dei portatori di carica", "b. cresce al crescere della densita' volumica dei portatori di carica", "c. cresce al crescere del tempo medio che intercorre tra due urti successivi tra i portatori di carica", "d. cresce al crescere della massa dei portatori di carica"],
    correctAnswer: 3
},

{
    id: 139,
    text: "Un condensatore a facce piane e parallele viene caricato con una carica Q e poi isolato. Dopodiché, il volume tra le armature viene riempito con un gas avente costante dielettrica relativa εr. Quale tra le seguenti affermazioni è corretta:",
    options: [
        "a. L'energia elettrostatica Ue nel condensatore scala di un fattore εr²",
        "b. L'energia elettrostatica Ue nel condensatore scala di un fattore 1/εr²",
        "c. L'energia elettrostatica Ue nel condensatore scala di un fattore 1/εr",
        "d. L'energia elettrostatica Ue nel condensatore scala di un fattore εr"
    ],
    correctAnswer: 2
},

{
    id: 140,
    text: "In un materiale diamagnetico isotropo:",
    options: ["a. il vettore magnetizzazione M e' parallelo al campo magnetizzante H", "b. il vettore magnetizzazione M e' nullo se il campo magnetizzante H e' nullo ✓", "c. il momento di dipolo magnetico medio e' parallelo al campo magnetizzante H", "d. il vettore magnetizzazione M puo' essere non-nullo anche se il campo magnetizzante H e' nullo"],
    correctAnswer: 1
},

{
    id: 141,
    text: "Un filo conduttore rettilineo e' percorso da corrente stazionaria I non nulla. Ad una distanza pari ad a, una sbarretta conduttrice lunga d, disposta ortogonalmente al filo, si sposta in direzione parallela alla corrente con velocita' costante v non nulla. Quale affermazione e' corretta:",
    options: [
        "a. Vi e' una differenza di potenziale elettrico non nulla tra gli estremi della sbarretta, il cui valore assoluto e' direttamente proporzionale alla lunghezza d della sbarretta",
        "b. La differenza di potenziale elettrico tra gli estremi della sbarretta e' nulla",
        "c. Vi e' una differenza di potenziale elettrico non nulla tra gli estremi della sbarretta, il cui valore assoluto e' direttamente proporzionale alla distanza a della sbarretta dal filo",
        "d. Vi e' una differenza di potenziale elettrico non nulla tra gli estremi della sbarretta, il cui segno si inverte se il vettore velocita' della sbarretta inverte il verso"
    ],
    correctAnswer: 3
},

{
    id: 142,
    text: "Si consideri la corrente oscillante che viene indotta in una spira conduttrice che ruota immersa in un campo magnetico uniforme. Quale delle seguenti affermazioni e' vera:",
    options: ["a. La corrente oscillante e' armonica con frequenza uguale alla frequenza di rotazione della spira", "b. La corrente oscillante e' armonica e sfasata di |π/2| rispetto alla forza elettromotrice indotta nella spira", "c. La corrente oscillante ha un'ampiezza indipendente dalla frequenza di rotazione della spira", "d. La corrente oscillante ha un'ampiezza indipendente dall'area della superficie della spira"],
    correctAnswer: 0
},

{
    id: 143,
    text: "All'interno di una sfera conduttrice neutra viene realizzata una cavità sferica, omocentrica alla sfera. Al centro dello spazio vuoto della cavità, viene collocata una carica puntiforme Q. Quale delle seguenti asserzioni e' corretta:",
    options: [
        "a. Il campo elettrostatico all'esterno del materiale conduttore e' nullo, per via dell'effetto di schermo elettrostatico",
        "b. Il potenziale elettrostatico nel conduttore e' costante",
        "c. Il potenziale elettrostatico in qualunque punto all'interno della cavita' e' identico al potenziale in qualunque punto del materiale conduttore",
        "d. Il campo elettrostatico all'interno della cavita' e' nullo, a causa delle note proprieta' dei materiali conduttori"
    ],
    correctAnswer: 1
},

{
    id: 144,
    text: "All'interno di una sfera conduttrice neutra viene realizzata una cavità di forma qualunque. Nello spazio vuoto della cavità, viene collocata una carica puntiforme Q (nota: tale carica non viene distribuita o localizzata sulle pareti interne della cavità). Quale delle seguenti asserzioni e' corretta:",
    options: [
        "a. Il campo elettrostatico all'interno della cavità e' nullo, a causa delle note proprietà dei materiali conduttori",
        "b. Il campo elettrostatico all'esterno del materiale conduttore e' nullo, per via dell'effetto di schermo elettrostatico",
        "c. Il potenziale elettrostatico nel conduttore e' costante",
        "d. Il potenziale elettrostatico in qualunque punto all'interno della cavità e' identico al potenziale in qualunque punto all'interno del materiale conduttore"
    ],
    correctAnswer: 2
},

{
    id: 145,
    text: "Dato un condensatore cilindrico (raggio interno R_i, raggio esterno R_e, altezza h), caricato con una carica Q non nulla, e poi isolato:",
    options: [
        "a. la densita' di energia elettrostatica nello spazio tra le armature scala come 1/r^2, dove r e' la distanza dall'asse del condensatore",
        "b. la densita' di energia elettrostatica nello spazio tra le armature scala come 1/r, dove r e' la distanza dall'asse del condensatore",
        "c. la densita' di energia elettrostatica e' costante nello spazio tra le armature cilindriche",
        "d. il campo elettrostatico all'interno dell'armatura interna (per r < R_i) e' costante e non nullo"
    ],
    correctAnswer: 0
},

{
    id: 146,
    text: "Un'onda piana, monocromatica, che si propaga nella direzione dell'asse x:",
    options: [
        "a. non puo' avere associato un campo magnetico oscillante, orientato nella direzione z",
        "b. non puo' avere associato un campo elettrico oscillante, orientato nella direzione z",
        "c. non puo' avere associato un campo elettrico oscillante, orientato nella direzione y",
        "d. non puo' avere associato un campo magnetico oscillante, orientato nella direzione y"
    ],
    correctAnswer: 1
},

{
    id: 147,
    text: "In un'onda piana monocromatica, la cui lunghezza d'onda e' λ:",
    options: [
        "a. Il vettore di Poynting inverte il verso ogni semi-periodo di oscillazione, se la polarizzazione e' lineare",
        "b. Il vettore di Poynting ha modulo, direzione e verso costanti nel tempo, se la polarizzazione e' circolare",
        "c. Il vettore di Poynting ha modulo, direzione e verso costanti nel tempo, se la polarizzazione e' lineare",
        "d. Il vettore di Poynting ha modulo costante nel tempo per qualunque stato di polarizzazione"
    ],
    correctAnswer: 1
},

{
    id: 148,
    text: "In un'onda piana monocromatica, la cui lunghezza d'onda e' λ:",
    options: ["a. Il vettore di Poynting inverte il verso ogni semi-periodo di oscillazione, se la polarizzazione e' lineare", "b. Il vettore di Poynting ha modulo, direzione e verso costanti nel tempo, se la polarizzazione e' circolare", "c. Il vettore di Poynting ha modulo, direzione e verso costanti nel tempo, se la polarizzazione e' lineare", "d. Il vettore di Poynting ha modulo costante nel tempo per qualunque stato di polarizzazione"],
    correctAnswer: 1
},

{
    id: 149,
    text: "Un filo conduttore rettilineo e' percorso da corrente stazionaria I non nulla. Ad una distanza pari ad a, una sbarretta conduttrice lunga d, disposta ortogonalmente al filo, si sposta in direzione parallela alla corrente con velocita' costante e non nulla. Quale affermazione e' corretta:",
    options: ["a. Vi e' una differenza di potenziale elettrico non nulla tra gli estremi della sbarretta, dove l'estremo a potenziale maggiore e' quello piu' lontano al filo", "b. Vi e' una differenza di potenziale elettrico non nulla tra gli estremi della sbarretta, il cui valore assoluto dipende linearmente dalla lunghezza della sbarretta", "c. Vi e' una differenza di potenziale elettrico non nulla tra gli estremi della sbarretta, dove l'estremo a potenziale maggiore e' quello piu' vicino al filo", "d. La differenza di potenziale elettrico tra gli estremi della sbarretta e' zero"],
    correctAnswer: 2
},

{
    id: 150,
    text: "Un solenoide rettilineo e' attraversato da una corrente variabile nel tempo. Il campo elettrico indotto:",
    options: ["a. ha linee di campo radiali, con origine sull'asse del solenoide", "b. ha linee di campo circolari, centrali sull'asse del solenoide", "c. e' nullo all'esterno del solenoide", "d. e' uniforme (e non nullo) all'interno del solenoide"],
    correctAnswer: 1
},

{
    id: 151,
    text: "Un cilindro cavo conduttore (raggio interno r_i, raggio esterno r_e, lunghezza indefinita) e' percorso da una corrente stazionaria che scorre parallelamente al suo asse. Il campo magnetico prodotto dalla corrente:",
    options: ["a. ha modulo uniforme, non nullo, all'interno del materiale conduttore (cioe' per r_i < r < r_e)", "b. e' nullo all'interno del materiale conduttore (cioe' per r_i < r < r_e)", "c. e' nullo all'interno della parte cava del cilindro conduttore (cioe' per r < r_i)", "d. ha modulo uniforme, non nullo, all'esterno del conduttore (cioe' per r > r_e)"],
    correctAnswer: 3
},

{
  id: 152,
  text: "Una particella dotata di massa m e carica q viaggia di moto rettilineo uniforme a velocita' v costante, per poi entrare in una regione di spazio permeata da un campo magnetostatico uniforme B ⊥ v. Dopodiche' la particella procede di moto circolare uniforme. Quale tra le seguenti affermazioni e' corretta:",
  options: ["a. La forza centripeta a cui e' sottoposta la particella e' indipendente dalla sua massa m", "b. La forza centripeta a cui e' sottoposta la particella e' direttamente proporzionale alla sua massa m", "c. La forza centripeta a cui e' sottoposta la particella e' inversamente proporzionale alla sua massa m", "d. Tutte le altre affermazioni sono errate"],
  correctAnswer: 0
},

{
  id: 153,
  text: "Una barretta cilindrica di materiale ferromagnetico ha magnetizzazione uniforme orientata nella direzione del suo asse.",
  options: ["a. Il momento di dipolo magnetico della barretta e' indipendente dalla lunghezza della barretta", "b. la corrente amperiana totale e' proporzionale alla lunghezza della barretta", "c. Il momento di dipolo magnetico della barretta e' indipendente dalla sezione trasversale della barretta", "d. la corrente amperiana totale e' proporzionale alla sezione trasversale della barretta"],
  correctAnswer: 3
},

{
    id: 154,
    text: "La forza di interazione tra un campo magnetico B ed un filo conduttore rettilineo di lunghezza L, complanare a B e percorso da corrente stazionaria I costante:",
    options: ["a. in modulo e' proporzionale alla divergenza di B", "b. e' risultante parallela a B", "c. in modulo, e' proporzionale all'integrale, sul filo L, della componente di B perpendicolare al tratto di filo L", "d. in modulo, e' proporzionale all'integrale, sul filo L, della componente di B parallela al tratto di filo L"],
    correctAnswer: 2
},

{
    id: 155,
    text: "L'energia elettrostatica associata ad una carica Q=1.5 mC distribuita sulla superficie di una sfera conduttrice di raggio R=8 cm e' circa:",
    options: ["a. 224 kJ", "b. 170 kJ", "c. 30.35 J", "d. 337 kJ"],
    correctAnswer: 1
},

{
    id: 156,
    text: "suca domanda corrotta",
    options: ["cazzi", "duri", "piselli", "risposta giusta"],
    correctAnswer: 3
},
{
  id: 159,
  text: "in un condensatore a forze piane e parallele, il campo elettrico tra le armature varia nel tempo secondo la legge E = E₀ · cos(ωt). La densità di corrente di spostamento:",
  options: ["a. è oscillante ed è in fase col campo E", "b. è uniforme nello spazio compreso tra le armature del condensatore", "c. è costante nel tempo", "d. non è mai nulla"],
  correctAnswer: 0
},

{
  id: 157,
  text: "La forza risultante su di un dipolo elettrico avente p ≠ 0 immerso in un campo elettrostatico E ≠ 0",
  options: ["a. e' sempre orientata nella direzione del campo E", "b. e' nulla se E e' uniforme", "c. se diversa da zero, e' sempre diretta parallelamente al vettore momento di dipolo p", "d. e' sempre nulla perche' e' nulla la carica elettrica netta del dipolo"],
  correctAnswer: 2
},

{
    id: 158,
    text: "pettrometro di massa, uno ione con un dato rapporto carica/massa compie una traiettoria caratterizzata da un raggio di curvatura r. Se si raddoppia la ddp ΔV e il campo magnetico B dello spettrometro, il nuovo raggio di curvatura della traiettoria del medesimo ione sarà circa:",
    options: ["0.5 · r", "0.71 · r", "r", "1.4 · r"],
    correctAnswer: 1
},

{
    id: 159,
    text: "Due solenoidi lineari, coassiali di pari lunghezza, aventi N₁ ed N₂ spire circolari rispettivamente di raggi r₁ ed r₂, con r₂ < r₁, sono attraversati dalle correnti I₁ e I₂",
    options: [
        "il coefficiente di mutua induzione dei due solenoidi e' linearmente (direttamente) proporzionale a r₂",
        "il coefficiente di mutua induzione dei due solenoidi e' linearmente (direttamente) proporzionale a r₁",
        "il campo magnetico prodotto dal solenoide 2 e' completamente concatenato al solenoide 1",
        "il campo magnetico prodotto dal solenoide 1 e' completamente concatenato al solenoide 2"
    ],
    correctAnswer: 1
},

{
    id: 160,
    text: "L'energia potenziale magnetica della spira in figura si può esprimere come",
    options: ["a. -μ₀ I² / 2πr", "b. μ₀ I² / 2πr", "c. μ₀ I² / 2πr - 2πr²", "d. -μ₀ I² / 2πr - 2πr²"],
    correctAnswer: 0
},

{
    id: 161,
    text: "Una carica Q > 0 è distribuita su di una sfera conduttrice di raggio R. La sfera conduttrice è totalmente e uniformemente ricoperta da uno strato dielettrico di spessore h e costante dielettrica relativa εr. Quale tra le seguenti affermazioni è corretta?",
    options: [
        "a. le cariche di polarizzazione sulla superficie esterna del dielettrico valgono: Q / εr",
        "b. le cariche di polarizzazione sulla superficie esterna del dielettrico dipendono dallo spessore h dello strato",
        "c. le cariche di polarizzazione sulla superficie esterna del dielettrico valgono: Q / (εr - 1)",
        "d. le cariche di polarizzazione sulla superficie esterna del dielettrico valgono: Q / (εr - 1) * εr"
    ],
    correctAnswer: 2
},

{
    id: 162,
    text: "L'energia potenziale magnetica della spira in figura si puo' esprimere come:",
    options: [
        "-μ₀ I₁I₂ / 2π · (a + b) / d",
        "μ₀ I₁I₂ / 2π · (a + b) / d",
        "μ₀ I₁I₂ / 2π · a · log(a + b) / d",
        "-μ₀ I₁I₂ / 2π · a · log(a + b) / d"
    ],
    correctAnswer: 3
},

{
    id: 163,
    text: "Data un'onda elettromagnetica piana, monocromatica, che si propaga nel vuoto:",
    options: [
        "a. se la frequenza viene raddoppiata, il numero d'onda si dimezza",
        "b. se la frequenza viene raddoppiata, la lunghezza d'onda raddoppia",
        "c. se la pulsazione viene raddoppiata, la velocità di propagazione raddoppia",
        "d. lunghezza d'onda e numero d'onda sono indipendenti dalla velocità di propagazione"
    ],
    correctAnswer: 3
},

{
    id: 164,
    text: "Due particelle, ciascuna di carica +q, sono poste nel vuoto nei punti di coordinate (α, 0) e (-α, 0) del piano XY. Qual è il potenziale che si misura nel punto P(0, β)?",
    options: ["zero", "q / (4πε₀(β² + α²))", "q / (4πε₀√(β² + α²))", "q / (2πε₀√(β² + α²))"],
    correctAnswer: 2
},

{
    id: 165,
    text: "RICAVO r1, r2\nr1 = √[(α-0)² + (0-β)²]\nr1 = √(α² + β²)\nr2 = √[(α-0)² + (0-β)²]\nr2 = √(α² + β²)\nV(P) = V1 + V2 = q / (4πε₀r₁) + q / (4πε₀r₂)\nV(P) = q / (4πε₀√(α²+β²)) + q / (4πε₀√(α²+β²))",
    options: ["2q / (4πε₀√(α²+β²))", "q / (4πε₀√(α²+β²))", "0", "q² / (4πε₀(α²+β²))"],
    correctAnswer: 0
},

{
  id: 166,
  text: "IL MIO SISTEMA E' EQUIPOTENZIALE CIOE' V=V1=V2. LA CARICA TOTALE DEL MIO SISTEMA E' PAI 4:",
  options: ["0", "1", "2", "4"],
  correctAnswer: 0
},

{
    id: 167,
    text: "Si vuole introdurre una lastra di alluminio tra le espansioni polari di un elettromagnete che produce un campo uniforme e costante di intensità pari a 3 T. Conviene muoverla rapidamente o lentamente?",
    options: [
        "Rapidamente, perché l'alluminio ha basso peso specifico.",
        "Lentamente, per ridurre gli effetti dell'induzione elettromagnetica.",
        "È indifferente, perché il campo magnetico prodotto dall'elettromagnete è più debole di quello terrestre.",
        "È indifferente, perché il campo è costante."
    ],
    correctAnswer: 1
},

{
    id: 168,
    text: "Un elettrone di carica e e velocità di modulo v compie una semicirconferenza di raggio R per effetto di un campo magnetico di modulo B, posto perpendicolarmente a v. Quanto vale il lavoro L compiuto dalla forza di Lorentz?",
    options: ["L = -πevBR", "L = 0 J", "L = πevBR", "L = 2πevBR"],
    correctAnswer: 1
},

{
  id: 169,
  text: "Una spira quadrata rigida giace nel piano xy con i vertici nei punti di coordinate P = (a,0), Q = (2a,0), R = (2a,a), S = (a,a) ed è percorsa da una corrente I in verso antiorario rispetto ad un osservatore concorde con l'asse z. In presenza di un campo magnetico B = k x u_x, con k costante, quanto vale la forza totale F che agisce sulla spira?",
  options: ["F = 0", "F = i k a^2 u_x", "F = 2 i k a^2 u_x", "F = i k a^2 u_x + 2 i k a^2 u_y"],
  correctAnswer: 1
},

{
  id: 170,
  text: "APPLICO LA REGOLA DELLA MANO DESTRA PER TROVARE LA DIREZIONE DELLE FORZE CHE AGISCONO SULLA SPINA (FRECCIA VERDE).",
  options: ["La forza è perpendicolare al piano formato da spina e corrente", "La forza è parallela alla spina", "La forza è diretta verso l'alto", "La forza è diretta verso il basso"],
  correctAnswer: 0
},

{
  id: 171,
  text: "Un circuito chiuso rigido in un campo magnetico uniforme e' sottoposto ad una forza",
  options: ["(a) costante pari al prodotto dell'area del circuito per il campo magnetico.", "(b) diversa da zero solo se il circuito e' piano.", "(c) diversa da zero solo se il circuito non sta in un piano.", "(d) sempre nulla."],
  correctAnswer: 3
},

{
    id: 172,
    text: "In un solenoide rettilineo ideale avente raggio R e n spire per unità di lunghezza, la corrente i(t) varia con la legge armonica i₀ sin(ωt). Calcolare l'intensità E del campo elettrico indotto alla distanza r dall'asse del solenoide, essendo r > R",
    options: [
        "E = \\frac{1}{R} \\mu_0 n \\omega i_0 r^2 \\sin(\\omega t)",
        "E = \\frac{1}{2R} \\mu_0 n \\omega i_0 r^2 \\cos(\\omega t)",
        "E = \\frac{1}{2r} \\mu_0 n \\omega i_0 R^2 \\cos(\\omega t)",
        "E = \\frac{1}{R} \\mu_0 n \\omega i_0 (r - R)^2 \\cos(\\omega t)"
    ],
    correctAnswer: 1
},

{
  id: 173,
  text: "L'INTENSITA ⇒ NON MI INTERESSA IL SECONDO .",
  options: ["(a) Non è definita in questo contesto", "(b) È proporzionale alla densità di corrente", "(c) È un vettore che indica la direzione del flusso", "(d) È misurata in ampere per metro quadrato"],
  correctAnswer: 0
},
{
  id: 178,
  text: "La pressione elettrostatica che si esercita in un conduttore carico",
  options: ["(a) tende sempre a contrarre il conduttore, perché cariche di segno opposto si attirano", "(b) dipende dalla forma del conduttore", "(c) dipende dal segno della carica depositata sul conduttore", "(d) tende sempre a dilatare il conduttore"],
  correctAnswer: 0
},

{
    id: 174,
    text: "Due fili paralleli rettilinei di lunghezza indefinita posti nel vuoto e distanti d = 1 m l'uno dall'altro sono percorsi da due correnti concordi i1 e i2. Determinare l'intensità B del campo magnetico nel punto posto a metà della congiungente i due fili.",
    options: [
        "B = μ0|i1 - i2|/(4πd)",
        "B = μ0|i1 - i2|/d",
        "B = μ0|i1 - i2|/(πd)",
        "B = μ0|i1 - i2|/(2πd)"
    ],
    correctAnswer: 0
},

{
  id: 175,
  text: "Un filo rettilineo, infinito e immerso in un materiale avente permeabilità magnetica κₘ = 1.2, è percorso da una corrente i = 4 A. Calcolare il modulo del campo magnetico B generato dal filo ad una distanza r = 0.2 m.",
  options: ["(a) B = 4.8 · 10⁻⁶ T", "(b) B = 2.4 · 10⁻⁷ T", "(c) B = 2.4 · 10⁻⁴ T", "(d) B = 4.8 · 10⁻⁵ T"],
  correctAnswer: 0
},

{
    id: 176,
    text: "Un filo conduttore rigido, giacente su di un piano, è costituito da due tratti rettilinei di lunghezza L = 1.0 m, perpendicolari tra loro, raccordati da un arco di circonferenza di raggio R = L. Il filo è percorso da una corrente I = 8.0 A ed è immerso in un campo magnetico uniforme avente modulo B = 0.02 T, diretto perpendicolarmente al piano su cui giace il filo conduttore. Determinare il modulo della forza magnetica che agisce sul filo.",
    options: ["= 0 N", "= 0.64 N", "= 0.45 N", "= 0.32 N"],
    correctAnswer: 1
},

{
    id: 177,
    text: "Fx = F1x + F2x = iLB + iLB\nFy = F2y + F3y = iLB + iLB\nFx = 2iLB  Fy = 2iLB\nF = √( (2iLB)² + (2iLB)² )\nF = √(4i²L²B² + 4i²L²B²)\nF = iLB√8 = 2iLB√2\nF = 0/45 N.",
    options: ["F = 0 N", "F = 2iLB√2", "F = iLB√2", "F = 4iLB"],
    correctAnswer: 1
},

{
    id: 178,
    text: "l'equazione di Poisson per il potenziale elettrico △V = -ρ/ε₀ vale",
    options: ["(a) solo se il potenziale elettrico è statico.", "(b) solo se il potenziale elettrico dipende dal tempo.", "(c) sempre.", "(d) solo se le cariche che lo generano sono puntiformi."],
    correctAnswer: 2
},

{
    id: 179,
    text: "Un condensatore ha una capacità di 4.7 nF in assenza di dielettrico fra le sue armature. Il condensatore viene caricato fino a ottenere una differenza di potenziale fra le armature pari a V0 = 150 V in aria. Successivamente, in condizioni di isolamento elettrico, il condensatore è completamente riempito con un dielettrico la cui costante dielettrica relativa vale 3. (A) Quanto vale la nuova differenza di potenziale V fra le armature? (B) Quanta carica aggiuntiva ΔQ sarà necessaria per ripristinare la differenza di potenziale originale V0?",
    options: ["(a) (A) V = 100 V; (B) ΔQ = 2.115 μC.", "(b) (A) V = 50 V; (B) ΔQ = 0.705 μC.", "(c) (A) V = 50 V; (B) ΔQ = 1.41 μC.", "(d) (A) V = 100 V; (B) ΔQ = 0.705 μC."],
    correctAnswer: 2
},

{
  id: 180,
  text: "La equazione delle onde piane di una perturbazione ψ in un mezzo in cui la velocita' di propagazione e' v e' del tipo",
  options: ["(a) ∂²ψ/∂x² - 1/v² ∂²ψ/∂t² = 0", "(b) ∂²ψ/∂x² - 1/v ∂²ψ/∂t² = 0", "(c) ∂²ψ/∂x² + 1/v ∂²ψ/∂t² = 0", "(d) ∂²ψ/∂x² + 1/v² ∂²ψ/∂t² = 0"],
  correctAnswer: 0
},

{
  id: 181,
  text: "La carica q sulle armature di area S di un condensatore piano vuole variare in funzione del tempo con legge q(t) = at + b (dove a e b sono costanti) di dimensioni opportune). Calcolare la densità di corrente di spostamento Js che fluisce tra le armature stesse.",
  options: ["(a) Js = at/S", "Js = a/S", "(c) Js = ε₀at/S", "(d) Js = ε₀a/S"],
  correctAnswer: 1
},

{
    id: 182,
    text: "Una spira quadrata rigida di lato a = 20cm è percorsa da una corrente I = 2A ed è posta in un campo magnetico di modulo B = 0.6T la cui direzione forma un angolo θ = π/6 con la normale al piano su cui giace la spira. Determinare il modulo del momento meccanico M che agisce sulla spira.",
    options: ["(a) M = 2.4 · 10⁻³ Nm", "(b) M = 0Nm", "(c) M = 1.2 · 10⁻³ Nm", "(d) M = 2.4 · 10⁻² Nm"],
    correctAnswer: 3
},

{
  id: 183,
  text: "Nella legge di Ampère-Maxwell il termine corrispondente alla corrente di spostamento:",
  options: ["non è associato al moto di cariche elettriche", "si annulla se il mezzo è il vuoto", "è associato al moto degli elettroni di conduzione", "è associato alla variazione temporale del campo magnetico"],
  correctAnswer: 3
},

{
    id: 184,
    text: "L'intensita' di una onda monocromatica piana di ampiezza E0 e pulsazione ω nel vuoto è",
    options: ["(a) 2ε0E0^2", "(b) dipende dal valore di ω", "(c) ε0E0^2", "(d) (1/2)ε0E0^2"],
    correctAnswer: 2
},

{
    id: 185,
    text: "In una regione di spazio il campo elettrico è E = αxu_x + βyu_y + γzu_z, dove α, β e γ sono delle costanti. Quanto vale la carica contenuta in una sfera di raggio R centrata sull'origine:",
    options: ["(a) 0", "(b) ε₀ 4/3 π R³ (α + β + γ)", "(c) ε₀ 2/3 R³ (α + β + 3γ)", "(d) ε₀ 1/3 R³ (α + 2β + γ)"],
    correctAnswer: 1
},

{
  id: 186,
  text: "Quanto vale la energia dissipata in un circuito RL collegato ad un generatore di fem V₀ nell'intervallo di tempo 0 ≤ t ≤ ∞?",
  options: ["(a) Dipende anche dal valore di L.", "(b) V₀²/R", "(c) E' infinita", "(d) Zero."],
  correctAnswer: 2
},

{
  id: 187,
  text: "Un condensatore piano è riempito con una lastra di un materiale dielettrico omogeneo ed isotropo di costante dielettrica relativa κr = 3 posto perpendicolarmente a un campo elettrico esterno di modulo E0 = 15 V/m. Quanto vale il modulo della polarizzazione?",
  options: ["(a) P = 2.65 · 10⁻¹⁰ C/m²", "(b) P = 3.98 · 10⁻⁹ C/m²", "(c) P = 8.85 · 10⁻¹² C/m²", "(d) P = 8.85 · 10⁻¹¹ C/m²"],
  correctAnswer: 0
},

{
  id: 188,
  text: "In una lastra di materiale dielettrico spessa d con le superfici che la limitano parallele al piano y, z situate a x = 0 ed x = d, il vettore polarizzazione e' P = αx u_x + β u_y - 2β u_z dove α e β sono costanti di dimensioni opportune. Quanto valgono le densita' di carica superficiali σ_p a x = 0 e a x = d?",
  options: ["(a) σ_p(x = 0) = 0 e σ_p(x = d) = -β", "(b) σ_p(x = 0) = -α e σ_p(x = d) = α", "(c) σ_p(x = 0) = 0 e σ_p(x = d) = αd", "(d) σ_p(x = 0) = 0 e σ_p(x = d) = αd - β"],
  correctAnswer: 1
},

{
    id: 189,
    text: "Una superficie uniformemente carica, disposta parallelamente al piano (y, z) in x = 0, con densità di carica superficiale σ crea, nel vuoto, un campo elettrico E pari a :",
    options: ["(a) \\frac{\\sigma}{\\varepsilon_0} \\mathbf{u_x} per x > 0, e -\\frac{\\sigma}{\\varepsilon_0} \\mathbf{u_x} per x < 0", "(b) \\frac{\\sigma}{2\\varepsilon_0} \\mathbf{u_x} per x > 0, e -\\frac{\\sigma}{2\\varepsilon_0} \\mathbf{u_x} per x < 0", "(c) 0", "(d) \\frac{\\sigma}{\\varepsilon_0} \\mathbf{u_x} per x < 0, e -\\frac{\\sigma}{\\varepsilon_0} \\mathbf{u_x} per x > 0"],
    correctAnswer: 1
},

{
    id: 190,
    text: "L'energia di interazione, U, tra una carica puntiforme Q ed un dipolo P, posto a grande distanza r dalla carica è",
    options: ["(a) nulla", "(b) Qp", "(c) -k Q/r^3 (r · p), dove k = 1/(4πε₀)", "(d) k pQ/r, dove k = 1/(4πε₀)"],
    correctAnswer: 2
},

{
  id: 191,
  text: "Durante la propagazione di un'onda elettromagnetica nel vuoto:",
  options: [
    "non c'è energia, né elettrica né magnetica, se l'onda si propaga nel vuoto.",
    "la densità di energia elettrica è uguale a quella magnetica.",
    "la densità di energia elettrica è metà di quella magnetica.",
    "la densità di energia elettrica è doppia di quella magnetica."
  ],
  correctAnswer: 1
},

{
    id: 192,
    text: "Un selettore di velocità deve selezionare gli elettroni che viaggiano con una velocità di modulo pari a v = 10^5 m/s. Se viene applicato un campo magnetico di modulo B = 10^{-2} T, perpendicolarmente alla velocità degli elettroni, il campo elettrico deve essere:",
    options: [
        "di modulo E = 1.6 · 10^{-16} N/C, parallelo a B e ortogonale a v.",
        "di modulo E = 10^3 N/C, ortogonale sia a B che a v.",
        "di modulo E = 10^3 N/C, parallelo a B e ortogonale a v.",
        "di modulo E = 1.6 · 10^{-16} N/C, ortogonale sia a B che a v."
    ],
    correctAnswer: 2
},

{
    id: 193,
    text: "Si vuole realizzare un circuito RL usando un'induttanza L e due resistenze R₁ ed R₂. Le resistenze possono essere collegate tra loro in serie oppure in parallelo. Quale delle seguenti affermazioni è corretta?",
    options: [
        "La costante di tempo del circuito è minore se le due resistenze sono collegate in parallelo.",
        "La costante di tempo del circuito non dipende dal tipo di collegamento delle due resistenze.",
        "La costante di tempo del circuito è minore se R₁ > R₂.",
        "La costante di tempo del circuito è minore se le due resistenze sono collegate in serie."
    ],
    correctAnswer: 0
},

{
    id: 194,
    text: "Nella legge di Ampère-Maxwell, il termine corrispondente alla corrente di spostamento",
    options: [
        "non è associato al moto di cariche elettriche.",
        "è associato alla variazione temporale del campo magnetico.",
        "è associato al moto degli elettroni di conduzione.",
        "si annulla se il mezzo è il vuoto."
    ],
    correctAnswer: 1
},

{
    id: 195,
    text: "La rete rappresentata in figura comprende tre resistori, R1, R2, R3, e un generatore di fem ε con resistenza interna r. Quanto vale la tensione tra i punti A e B?",
    options: ["\\frac{\\varepsilon R_3}{r + R_3}", "\\frac{\\varepsilon (R_2 + R_3)}{(r + R_1 + R_2 + R_3)}", "\\frac{\\varepsilon (R_2 + R_3)}{(r + R_1)}", "\\frac{\\varepsilon (r + R_1 + R_2 + R_3)}{(R_2 + R_3)}"],
    correctAnswer: 1
},

{
    id: 196,
    text: "Una lastra piana di spessore 2d occupa la regione |x| < d ed è infinitamente estesa in y e z. La lastra è uniformemente carica con densità volumica di carica ρ. Quanto vale l'intensità del campo elettrico nelle due regioni di spazio: (a): 0 < x < d e (b): x > d ?",
    options: ["(a): E = \\frac{\\rho x}{\\varepsilon_0} ; (b): E = \\frac{\\rho x}{\\varepsilon_0}", "(a): E = \\frac{\\rho x}{\\varepsilon_0} ; (b): E = \\frac{\\rho d}{\\varepsilon_0}", "(a): E = \\frac{\\rho x}{2\\varepsilon_0} ; (b): E = \\frac{\\rho d}{2\\varepsilon_0}", "(a): E = \\frac{\\rho x}{2\\varepsilon_0} ; (b): E = \\frac{\\rho d}{\\varepsilon_0}"],
    correctAnswer: 2
},

{
    id: 197,
    text: "Buongiorno, il teorema di Gauss è una buona scelta, il campo elettrico avrà direzione lungo l'asse x, per la simmetria del problema, che è analoga a quella del piano infinito carico. Il teorema di Gauss ci permette quindi facilmente di ricavare il modulo del campo elettrico usando come possibile superficie gaussiana un parallelepipedo di area di base S ed altezza 2x (con una base parallela al piano yz e in posizione x e l'altra base parallela al piano yz e in posizione -x). Per x < d, il teorema di Gauss ci dice che E*2*S=rho*S*(2x)/epsilon_0, da cui E=rho*x/epsilon_0. Il flusso di E attraverso il parallelepipedo è il flusso attraverso le due aree di base (perché E ha direzione parallela all'asse x). La carica racchiusa nel parallelepipedo è pari alla densità volumica di carica per il volume del parallelepipedo. Per x > d, si ha che E*2*S=rho*S*(2d)/epsilon_0, da cui E=rho*d/epsilon_0. Adesso la carica racchiusa nel parallelepipedo è pari a rho*S*2d perché c'è carica solo nella porzione di parallelepipedo interna alla lastra, mentre non c'è carica al di fuori della lastra. Spero che questa chiarisca, se ha altri dubbi mi mandi i suoi risultati e vediamo.",
    options: [
        "Il campo elettrico è costante per x > d.",
        "Il campo elettrico è proporzionale a x per x < d.",
        "Il campo elettrico è nullo per x = 0.",
        "Il campo elettrico è indipendente dalla densità di carica."
    ],
    correctAnswer: 1
},

{
    id: 198,
    text: "Una sfera metallica cava (raggio interno Ri, raggio esterno Re) ha una carica totale pari a Q e ospita al centro O della cavità una carica puntiforme q. Il flusso del campo elettrico attraverso una superficie sferica di centro O e raggio Ri < r < Re è:",
    options: [
        "proporzionale a (q - Q).",
        "nullo.",
        "proporzionale a q.",
        "proporzionale a (q + Q)."
    ],
    correctAnswer: 2
},

{
    id: 199,
    text: "Sull'asse y di un sistema di riferimento cartesiano xyz si trova un tratto di filo conduttore rettilineo PQ di lunghezza finita, come mostrato in figura, e percorso da una corrente che scorre da P verso Q. Quali sono la direzione e il verso del campo magnetico B generato dal tratto di filo nel punto S?",
    options: ["B è perpendicolare al piano xy e ha verso uscente rispetto al disegno.", "B è perpendicolare al piano xy e ha verso entrante rispetto al disegno.", "B ha direzione e verso concordi con l'asse x.", "B ha direzione parallela all'asse x e verso opposto ad esso."],
    correctAnswer: 1
},

{
    id: 200,
    text: "Si consideri una superficie cubica di lato α, in cui sono presenti delle cariche elettriche, in quiete. Sia Q la somma algebrica delle cariche interne. Sapendo che il flusso del campo elettrostatico attraverso una delle facce del cubo è zero, che cosa si può dedurre?",
    options: [
        "che le cariche dentro il cubo sono disposte a formare un dipolo",
        "che, per simmetria, anche il flusso del campo attraverso le altre facce è zero, e quindi Q = 0",
        "che dentro il cubo non vi sono cariche di nessun tipo",
        "che il flusso complessivo attraverso le restanti 5 facce deve essere uguale a Q/ε₀"
    ],
    correctAnswer: 1
},

{
    id: 201,
    text: "Due fili infiniti paralleli recano una densità di carica per unità di lunghezza λ₁, λ₂. Considera un punto giacente nel piano che contiene i due fili, ed equidistante da essi. In tale punto",
    options: [
        "Il campo elettrostatico può essere nullo solo se la distanza fra i fili ha un valore ben definito.",
        "Il campo elettrostatico è nullo se λ₁ = λ₂",
        "Il campo elettrostatico non è mai nullo.",
        "Il campo elettrostatico è nullo se λ₁ = -λ₂"
    ],
    correctAnswer: 3
},

{
    id: 202,
    text: "Che cos'è il fronte d'onda di un'onda elettromagnetica?",
    options: [
        "una superficie sferica perpendicolare alla direzione di propagazione",
        "il luogo dei punti in cui, in ogni istante, ||E|| = ||B||",
        "il luogo dei punti in cui i campi E e B hanno, in ogni istante, la stessa fase",
        "un piano perpendicolare alla direzione di propagazione"
    ],
    correctAnswer: 2
},

{
    id: 203,
    text: "Si considerino due fili rettilinei indefiniti, paralleli, percorsi da correnti i1 e i2 e mantenuti fermi a distanza d uno dall'altro. E' possibile usare il teorema (o legge) di Ampère per calcolare il campo magnetico che i due fili creano in ogni punto dello spazio? Perché?",
    options: [
        "No, perché il teorema vale solo se il percorso γ è concatenato con una corrente alla volta",
        "No, perché la mancanza di simmetria del problema non permette di trovare un percorso γ concatenato con le due correnti su cui il campo abbia ovunque lo stesso modulo, a meno di non sapere già come è fatto il campo.",
        "Sì, perché il campo B è solenoidale",
        "Sì, perché basta calcolare la circuitazione del campo su una circonferenza γ qualunque concatenata con le due correnti"
    ],
    correctAnswer: 1
},

{
    id: 204,
    text: "Il positrone è un elettrone con carica +e (positiva) e massa uguale a quella dell'elettrone (m_pos = m_e). Un positrone e un protone (carica +e, massa m_prot ≈ 2000 m_pos) entrano con la stessa velocità v (parallela all'asse x) in una regione in cui vi è un campo magnetico statico di intensità B diretto lungo l'asse z. Cosa si può dire delle traiettorie delle due particelle?",
    options: [
        "Sono due circonferenze, percorse nello stesso verso, e di raggi uguali (r_pos = r_prot)",
        "Sono due circonferenze, percorse nello stesso verso, con raggi r_pos ≈ 2000 r_prot",
        "Sono due circonferenze, percorse nello stesso verso, con raggi r_prot ≈ 2000 r_pos",
        "Sono due circonferenze, percorse in verso opposto, stesso verso, con raggi r_prot ≈ 2000 r_pos"
    ],
    correctAnswer: 2
},

{
    id: 205,
    text: "Si considerino due cariche puntiformi Q1 e Q2 poste in un piano cartesiano, rispettivamente nei punti (-c, 0) e (c, 0) con c > 0. Quale delle seguenti espressioni dà correttamente il campo elettrico dovuto alle due cariche nel punto P(0, c)? (siano i e j i versori degli assi x e y, rispettivamente).",
    options: [
        "E = 1/(4πε0) * (Q1 + Q2)/(2c^2)",
        "E = 1/(4πε0) * [Q1*(c i + c j)/(c√2)^3 + Q2*(-c i + c j)/(c√2)^3]",
        "E = 1/(4πε0) * (Q1 + Q2)/c^2",
        "E = 1/(4πε0) * (-i Q1 + j Q2)/c^2"
    ],
    correctAnswer: 1
},

{
    id: 206,
    text: "Si consideri una sfera conduttrice di raggio R, avente una carica Q, posta nell'origine di un sistema di assi cartesiani e immersa in un materiale dielettrico (olio) di costante dielettrica relativa κₑ. Quanto vale il vettore induzione dielettrica, D, in un punto a distanza r > R dal centro della sfera?",
    options: [
        "D = 1/(4πε₀κₑ) Q/r² ūᵣ",
        "D = 1/(4π) Q/r² ūᵣ",
        "non è possibile calcolarlo senza conoscere il vettore polarizzazione p̅",
        "D = κₑ/(4πε₀) Q/r² ūᵣ"
    ],
    correctAnswer: 3
},

{
    id: 207,
    text: "Due fili indefiniti, paralleli, distanti r = 1 m, sono percorsi da correnti di intensità i1 e i2. Se i1 = 1 A e se i due fili si attraggono con una forza per unità di lunghezza pari a 4 · 10⁻⁷ N/m, quanto vale i2?",
    options: ["i2 = 16 A", "i2 = 2 · 10⁷ A", "i2 = 4 A", "i2 = 2 A"],
    correctAnswer: 3
},

{
    id: 208,
    text: "suca domanda corrotta",
    options: ["cazzi", "duri", "piselli", "risposta giusta"],
    correctAnswer: 3
},
{
    id: 216,
    text: "1.6 Linee di forza del campo elettrostatico\n\nL'introduzione del concetto di campo elettrostatico mette in evidenza che la presenza di un sistema di cariche, dal caso più semplice della singola carica puntiforme al caso più generale di una distribuzione spaziale, modifica lo spazio circostante nel senso che una carica di prova posta in un qualsiasi punto risente della forza (1.18), attribuita all'interazione con il campo (1.21).\n\nPartendo da una generica posizione e muovendosi per tratti infinitesimi successivi, ciascun parallelo e concorde al campo elettrostatico in quel dato punto, si ottiene una linea che è detta linea di forza o linea di campo: pertanto in ogni suo punto tale linea per definizione è tangente al campo e il suo verso di percorrenza indica il verso grafico complessiva del campo in tutto lo spazio, come vedremo negli esempi che seguono.\n\nNel caso di una carica puntiforme, il cui campo è dato da (1.14), le linee di forza hanno direzione radiale con origine sulla carica e sono uscenti da questa se è positiva, entranti se è negativa. Si vede dalla figura 1.30 che le linee di infittiscono mano che ci si avvicina alla sorgente del campo e ciò indica che l'intensità del campo è crescente.\n\nCome esempi successivi consideriamo due cariche puntiformi eguali in valore, ma di segno opposto (sistema detto dipolo elettrico che studieremo nel paragrafo 2.7), e due cariche puntiformi eguali in valore e segno (positive nella figura 1.31). Già a questo punto sono evidenti tutte le proprietà delle linee di forza. Oltre alle prime due già enunciate:\n\na) una linea di forza in ogni suo punto è tangente e concorde al campo in quel punto;\n\nb) le linee di forza si addensano dove l'intensità del campo è maggiore;\n\nabbiamo che:\n\nc) le linee di forza non si incrociano mai, in quanto in ogni punto il campo è definito univocamente e non può avere due direzioni distinte;\n\nd) le linee di forza hanno origine dalle cariche positive e terminano sulle cariche negative; qualora ci siano solo cariche di uno stesso segno le linee di forza si chiudono all'infinito;\n\ne) nel caso di cariche di segno opposto, ma eguali in modulo, tutte le linee che partono dalle cariche positive si chiudono su quelle negative, alcune passando eventualmente per l'infinito; se invece le cariche non sono eguali in modulo, alcune linee terminano o provengono dall'infinito, come nella figura 1.32 (+q, -q/2).\n\nUn campo uniforme è rappresentato da linee parallele e equidistanti (costanza del modulo).\n\nTali sono le linee del campo di un piano indefinito (esempio 1.8), mentre nel caso dei due piani dell'esempio 1.9 il campo è uniforme solo nell'intercapedine.\n\nNelle figure successive sono mostrate le linee di forza di carica lineare e superficiale degli esempi 1.6, 1.8.",
    options: [],
    correctAnswer: -1
},
{
    id: 217,
    text: "Trascorrendo gli effetti di bordo la capacità C del condensatore ha espressione:",
    options: [
        "C = \\frac{2\\pi\\varepsilon_0 h}{\\ln(R_1 R_2)}",
        "C = \\frac{2\\pi\\varepsilon_0 h}{\\ln\\left(\\frac{R_2}{R_1}\\right)}",
        "C = \\frac{4\\pi\\varepsilon_0 h}{\\ln\\left(\\frac{R_1}{R_2}\\right)}",
        "C = \\frac{4\\pi\\varepsilon_0 h}{\\ln\\left(\\frac{R_2}{R_1}\\right)}"
    ],
    correctAnswer: 1
},

{
    id: 209,
    text: "E' data l'espressione f(x, t) = F exp[-a(x + vt)^2] dove F e a sono costanti reali positive nelle opportune unità di misura. Quale delle seguenti affermazioni è corretta?",
    options: [
        "f(x, t) verifica l'equazione delle onde e rappresenta un'onda regressiva",
        "f(x, t) verifica l'equazione delle onde e rappresenta un'onda progressiva",
        "f(x, t) non può verificare l'equazione delle onde perché l'argomento (x + vt) è elevato al quadrato",
        "f(x, t) non può verificare l'equazione delle onde perché non varia con legge armonica"
    ],
    correctAnswer: 0
},

{
    id: 210,
    text: "E' data l'espressione A exp[- b(x - vt)²] dove A e b sono costanti reali positive date in opportune unità di misura. Quale delle seguenti affermazioni è corretta?",
    options: [
        "l'espressione data verifica l'equazione delle onde",
        "l'espressione data non verifica l'equazione delle onde",
        "l'espressione data verifica l'equazione delle onde solo per b/A ≪ 1",
        "l'espressione data non può verificare l'equazione delle onde perché la dipendenza da (x - vt) è quadratica invece che lineare"
    ],
    correctAnswer: 1
},

{
    id: 211,
    text: "UNA LINEA DI FORZA DEL CAMPO ELETTRICO E, IN OGNI PUNTO DELLO SPAZIO:",
    options: [
        "ha lunghezza proporzionale al potenziale elettrico in quel punto;",
        "ha lunghezza proporzionale al campo elettrico in quel punto;",
        "ha per versore tangente un vettore parallelo ad E;",
        "ha per versore tangente un vettore ortogonale E;"
    ],
    correctAnswer: 2
},

{
    id: 212,
    text: "Una bobina di area A = 10 cm² e resistenza R = 10 mΩ si trova in un campo magnetico B = 1.2 T diretto perpendicolarmente ad essa. Si ruota rapidamente la bobina di 180°, in modo da \"ribaltarla\" rispetto al campo. Da quanto carica viene attraversata?",
    options: ["0.24 C", "0.6 C", "0.12 C", "0.48 C"],
    correctAnswer: 0
},

{
    id: 213,
    text: "Due superfici piane e parallele sono uniformemente cariche con densità pari a σ₁ = 3 nC/m² e σ₂ = -6 nC/m². Quale è l'intensità E del campo elettrostatico nella regione compresa tra le due superfici?",
    options: ["E = 254 V/m", "E = 508 V/m", "E = 1.02 kV/m", "E = 2.04 kV/m"],
    correctAnswer: 1
},

{
    id: 214,
    text: "Perché in un ciclotrone la differenza di potenziale V(t) tra le due espansioni a forma di D varia con la legge V(t) = V₀ sin(ωt)",
    options: ["(a) per poter aumentare la energia cinetica della particella ad ogni passaggio tra le due espansioni a forma di D di qV₀", "(b) perché la differenza di potenziale non può essere costante tra le due espansioni a forma di D.", "(c) per mantenere la particella su una traiettoria di raggio costante", "(d) per ridurre la perdita di energia della particella"],
    correctAnswer: 2
},

{
  id: 215,
  text: "Fissato questo, se c'è un campo variabile in cui è immersa una bobina, ho che il flusso del campo magnetico attraverso la bobina è proporzionale al numero di spire, poiché per ogni spira c'è un flusso pari a campo per area della spira (assumendo che il campo sia uniforme e ortogonale al piano della bobina). La f.e.m. indotta nella bobina è quindi anche lei proporzionale al numero di spire, visto che la f.e.m. indotta è la derivata temporale del flusso, con il segno meno. Ricordo che quando ci sono campi magnetici variabili è sempre la legge di Faraday quella che ci dà la f.e.m. indotta.\n\nLa resistenza della bobina però è anche lei proporzionale al numero di spire perché la resistenza è proporzionale alla lunghezza del conduttore.\n\nLa corrente, essendo ottenuta dal rapporto tra f.e.m. indotta e resistenza i=f.e.m./R, è quindi indipendente dal numero di spire di cui è formata la bobina.\n\nCi sono due punti nel suo discorso a cui prestare attenzione:\n1) Ci sono problemi in cui mi interessa trovare la corrente indotta nella spira per effetto di un campo magnetico esterno variabile. In questo caso il flusso non dipende dalla corrente indotta che ne è invece conseguenza. Al contrario, ci sono problemi in cui mi interessa trovare per esempio l'autoinduttanza di un circuito in cui devo determinare il flusso attraverso un circuito del campo magnetico generato dalla corrente che scorre nel circuito stesso.\n2) Non capisco perché voleva considerare l'induttanza della bobina, assumendo di trovarci nel caso in cui nella bobina non viene fatta circolare corrente da un generatore.\n\nSpero che i punti sopra siano chiari perché sono dei punti abbastanza importanti per usare correttamente la legge di Faraday.",
  options: [
    "La corrente indotta è proporzionale al numero di spire.",
    "La corrente indotta è inversamente proporzionale al numero di spire.",
    "La corrente indotta è indipendente dal numero di spire.",
    "La corrente indotta dipende solo dalla resistenza del circuito."
  ],
  correctAnswer: 2
},

{
  id: 216,
  text: "Un elettrone, muovendosi ad una velocità v = 2 · 10^6 m/s, entra in un solenoide perpendicolarmente all'asse di questo. Il solenoide è composto di un avvolgimento di n = 5000 spire/m ed è percorso da una corrente continua di intensità I = 20 A. Qual è il raggio di curvatura della traiettoria dell'elettrone?",
  options: ["9 · 10^-3 m", "9 · 10^-5 m", "0.9 m", "9 · 10^-7 m"],
  correctAnswer: 1
},

{
    id: 217,
    text: "Per i portatori di carica il vettore densità di corrente elettrica è j = nQVd, dove n e Q sono rispettivamente la densità e la carica dei portatori di carica o velocità di deriva. Se i portatori di carica si muovono in un campo elettrico uniforme E",
    options: ["j ha lo stesso verso di E", "j ha verso opposto a quello di E", "j ha verso opposto a quello di Vd", "j ha un verso che dipende dalla carica Q dei portatori di carica"],
    correctAnswer: 0
},

{
    id: 218,
    text: "Si vuole realizzare un circuito RC usando una resistenza R e due condensatori di capacità C1 e C2 che possono essere collegati tra loro in serie oppure in parallelo. Quale delle seguenti affermazioni è corretta?",
    options: [
        "la rapidità dei transitori del circuito RC non dipende dal collegamento utilizzato per i due condensatori",
        "i transitori del circuito RC sono più rapidi se le due capacità sono disposte in serie",
        "i transitori del circuito RC sono più rapidi se le due capacità sono disposte in parallelo",
        "i transitori del circuito RC sono più rapidi se le due capacità sono uguali"
    ],
    correctAnswer: 2
},

{
  id: 219,
  text: "SERIE: Ceq = C1 + C2 Ts = R(C1 + C2) PARALLELO Ceq = C1C2 / (C2 + C4) Tp = R(C1C2 / (C1 + C2)) Tp < Ts",
  options: ["Ceq = C1 + C2 per serie", "Ceq = C1C2 / (C1 + C2) per parallelo", "Ts = R(C1 + C2) e Tp = R(C1C2 / (C1 + C2))", "Tp < Ts indica che il tempo di carica parallelo è minore"],
  correctAnswer: 2
},
{
  id: 230,
  text: "Una bobina di area Σ formata da N spire, con resistenza totale R, è sottoposta ad un campo magnetico B che forma con la normale alla spira un angolo θ. Il campo B è uniforme sul piano della spira e cambia col tempo con legge B = αt + β. Quanto vale, in modulo, la forza elettromotrice indotta nella bobina:",
  options: ["(a) NΣα cos θ", "(b) Σα cos θ", "(c) 0 perché il campo B ha divergenza nulla", "(d) NΣβ sin θ"],
  correctAnswer: 0
},

{
  id: 220,
  text: "Un dipolo elettrico il cui momento di dipolo è p = q a, dove a è il vettore posizione che individua la carica positiva, q, rispetto alla negativa, -q, è posto in un campo elettrico esterno E uniforme. A quale momento meccanico M è sottoposto:",
  options: ["(a) p · E", "(b) qE", "(c) nullo", "(d) p × E"],
  correctAnswer: 3
},

{
    id: 221,
    text: "In un punto di coordinate (x,y,z) in un mezzo conduttore, la densità di corrente ha l'espressione j = 3x²y u_x - 3xy² u_y + xy u_z. Cosa si può dire sulla densità di carica in quel punto?",
    options: ["Che diminuisce nel tempo.", "Non si può dire nulla.", "Che aumenta nel tempo.", "Che è costante."],
    correctAnswer: 3
},

{
    id: 222,
    text: "Su di una superficie equipotenziale la direzione del campo elettrico in ogni punto è:",
    options: ["(a) Dipende dalla forma della superficie.", "(b) Tangente alla superficie", "(c) Non ha una direzione determinata", "(d) Normale alla superficie"],
    correctAnswer: 3
},

{
    id: 223,
    text: "Il potenziale elettrico alla distanza d da una carica concentrata vale V. Alla distanza d' il potenziale è V' = 3V. Qual è il rapporto fra l'intensità del campo elettrico nel punto alla distanza d' e quella nel punto alla distanza d dalla carica concentrata?",
    options: ["1/9", "1/3", "9", "3"],
    correctAnswer: 2
},

{
    id: 224,
    text: "IN REGIME STAZIONARIO, IL VETTORE DI DENSITÀ DI CORRENTE È:",
    options: [
        "È INDIPENDENTE DALLA POSIZIONE NEC CONDUTTORE, MA DIPENDE DAL TEMPO.",
        "O PUÒ DIPENDERE DALLA POSIZIONE NE NEC CONDUTTORE, MA W DIPENDE DENTO DAL TEMPO.",
        "O È NUOVO IN TOTTO IL CONDUTTORE",
        "NON DIPENDE NE DALLA POSIZIONE NE NEC CONDUTTORE NE DAL TEMPO."
    ],
    correctAnswer: 1
},

{
    id: 225,
    text: "Il vettore spostamento elettrico definito da D = ε₀E + P è tale che",
    options: ["(a) ∇ · D = 0.", "(b) ∇ · D = (ρℓ + ρP), dove ρℓ è la densità di carica libera e ρP è la densità di carica di polarizzazione.", "(c) ∇ · D = ρP, dove ρP è la densità di carica di polarizzazione.", "(d) ∇ · D = ρℓ, dove ρℓ è la densità di carica libera."],
    correctAnswer: 3
},

{
    id: 226,
    text: "La funzione V = ax² + bxy - ay², con a e b costanti, descrive il potenziale elettrostatico in una regione indefinita di spazio bidimensionale. Il campo elettrostatico E e la densità di carica ρ in un generico punto della regione valgono:",
    options: [
        "E = (-2ax - by)u_x + (2ay - bx)u_y, ρ = -2b",
        "E = (-2ax - by)u_x + (2ay - bx)u_y, ρ = 0",
        "E = (2ax + by)u_x + (2ay - by)u_y, ρ = 4a",
        "E = (2ax + by)u_x + (2ay - bx)u_y, ρ = 0"
    ],
    correctAnswer: 1
},

{
  id: 227,
  text: "∇·E⃗ = P/ε₀ => P = ε₀∇·E⃗ = 0 C/m³\n∇E⃗ = ∂(-2ax - by)/∂x + ∂(-bx + 2ay)/∂y\n∇E⃗ = -2a + 2a = 0\nVE' UNA FUNZIONE. IL GRADIENTE DI UNA FUNZIONE: BISOGNA FARE LA DEGLIATA PARZIALE: ∂V/∂x E ∂V/∂y MA DI TUTTA LA FUNZIONE\nINVECE SE ABBIAMO IL GRADIENTE DI UN CAMPO: DOBBIAMO FARE ∇·G⃗ = (∂Gx/∂x i ∂Gy/∂y j ∂Gz/∂z k)\nLE DEGLIATE PARZIALI DI OGNI COMPONENTE.",
  options: ["a) Il campo elettrico è conservativo", "b) Il campo elettrico è irrotazionale", "c) Il campo elettrico è solenoidale", "d) Il campo elettrico ha divergenza nulla"],
  correctAnswer: 3
},

{
    id: 228,
    text: "Il momento di dipolo di una molecola d'acqua vale in modulo p = 6.1 · 10⁻³⁰ C·m. A che distanza d tra loro dovrebbero trovarsi un protone ed un elettrone per avere lo stesso momento di dipolo? Quanto vale il modulo E del campo elettrico nel piano equatoriale di tale dipolo, ad una distanza di 70 nm dal suo centro?",
    options: ["d = 3.8 · 10⁻¹¹ m, E = 160 V/m", "d = 3.8 · 10⁻¹¹ m, E = 1.12 · 10⁻⁵ V/m", "d = 7.6 · 10⁻¹¹ m, E = 4.3 V/m", "d = 7.6 · 10⁻¹¹ m, E = 2.4 · 10⁻³ V/m"],
    correctAnswer: 0
},

{
    id: 229,
    text: "La velocità di gruppo di un'onda elettromagnetica può essere espressa come:",
    options: ["(a) v_g = (1/ω)dω/dk", "(b) v_g = dω/dk", "(c) v_g = (1/k)dk/dω", "(d) v_g = dk/dω"],
    correctAnswer: 1
},

{
    id: 230,
    text: "Fra le piastre di un condensatore piano inserito in un circuito posto nel vuoto è presente un campo elettrico E = E(t)u_x la cui intensità varia nel tempo secondo la legge E(t) = E_0 sin^2(ωt). Determinare l'espressione del vettore densità di corrente j_s",
    options: ["j_s = ε_0ωE_0 sin(2ωt)u_x", "j_s = -ε_0ωE_0 sin(ωt)u_x", "j_s = ε_0ωE_0 cos(2ωt)u_x", "j_s = ε_0ωE_0 cos^2(ωt)u_x"],
    correctAnswer: 0
},

{
    id: 231,
    text: "Una particella di carica q > 0 e massa m si muove fra i punti 1 (posizione iniziale) e 2 (posizione finale) sotto l'azione di un campo elettrico E = -∇V. Se v denota il valore della velocità della particella, quale delle seguenti relazioni è corretta?",
    options: ["\\frac{1}{2}m(v_2^2 - v_1^2) = q(V_1 - V_2)", " \\frac{1}{2}m(v_2^2 - v_1^2) dipende dalla traiettoria descritta dalla particella fra i punti 1 e 2", " \\frac{1}{2}m(v_2^2 - v_1^2) = q(V_2 - V_1)", " \\frac{1}{2}m(v_2^2 - v_1^2) = q(V_1 + V_2)"],
    correctAnswer: 0
},

{
    id: 232,
    text: "Un elettrone entra in una zona di ampiezza d = 6.4cm ai cui capi è applicata una differenza di potenziale di 72 V. Si trovi l'accelerazione dell'elettrone:",
    options: ["19.7 · 10^13 m/s^2", "19.7 · 10^38 m/s^2", "19.7 · 10^11 m/s^2", "19.7 · 10^7 m/s^2"],
    correctAnswer: 0
},

{
  id: 233,
  text: "Un condensatore di capacità C = 10 μF è collegato a una tensione di 12 V. Qual è l'energia immagazzinata nel condensatore?",
  options: ["0,72 mJ", "7,2 mJ", "72 mJ", "720 mJ"],
  correctAnswer: 1
},

{
    id: 234,
    text: "Quale deve essere il valore v della velocità di un fascio di elettroni nel vuoto affinché l'azione simultanea di un campo elettrico di intensità E e di un campo magnetico di intensità B, entrambi perpendicolari al fascio, non produca alcuna deflessione degli elettroni? e e m sono la carica e la massa dell'elettrone.",
    options: ["v = eB / mE", "v = E / B", "v = eE / mB", "v = B / E"],
    correctAnswer: 1
},

{
    id: 235,
    text: "La legge di Faraday stabilisce che:",
    options: ["ogni qual volta il flusso del campo magnetico Φ(B) concatenato con un circuito varia nel tempo, si manifesta nel circuito una forza elettromotrice indotta.", "le sorgenti del campo magnetico B sono le correnti.", "ogni qual volta il flusso del campo magnetico Φ(B) concatenato con un materiale isolante varia nel tempo, si manifesta nel circuito una corrente indotta.", "non esistono monopoli magnetici."],
    correctAnswer: 0
},

{
    id: 236,
    text: "L'energia dissipata in un circuito RL, collegato ad un generatore di fem V₀, nell'intervallo di tempo 0 ≤ t ≤ ∞",
    options: ["è inversamente proporzionale ad L", "è nulla", "è infinita.", "è pari a ½ L (V₀/R)²"],
    correctAnswer: 3
},

{
  id: 237,
  text: "Un anello di legno e un anello metallico delle stesse dimensioni sono posti in uno stesso campo magnetico perpendicolare al piano in cui si trovano entrambi. Se il campo magnetico varia nel tempo, la f.e.m. indotta negli anelli:",
  options: ["è nulla nell'anello di legno.", "è la stessa in entrambi gli anelli.", "è maggiore nell'anello metallico rispetto all'anello di legno.", "dipende dal tipo di metallo di cui è composto l'anello conduttore."],
  correctAnswer: 0
},

{
  id: 238,
  text: "Due sfere metalliche con stesso raggio, stessa carica e massa sono sospese a due fili isolanti. Quale angolo formano i fili rispetto alla verticale se la tensione dei fili è pari a 9.81 · 10⁻²N e la massa di ogni sfera, è pari a 7g ?",
  options: ["60°", "45°", "90°", "30°"],
  correctAnswer: 3
},

{
  id: 239,
  text: "Il campo elettrostatico creato da una distribuzione di cariche descritta da una densità volumica di carica ρ è",
  options: ["con rotore nullo.", "con divergenza nulla.", "uniforme.", "con gradiente nullo."],
  correctAnswer: 0
},

{
    id: 240,
    text: "Un dielettrico, di costante dielettrica relativa εᵣ, viene inserito all'interno di un condensatore carico che viene mantenuto connesso a un generatore di f.e.m. E. La differenza di potenziale ΔV tra le armature del condensatore, in presenza del dielettrico, vale:",
    options: ["ΔV = E", "ΔV = εᵣ E", "ΔV = (εᵣ -1) E", "ΔV = E / εᵣ"],
    correctAnswer: 3
},

{
  id: 241,
  text: "Due spire circolari concentriche di raggi R e r, con R ≥ r, giacciono inizialmente nel piano xy, con centro nell'origine. Quella grande è tenuta fissa ed è percorsa da una corrente i che resta sempre costante. Se la spira piccola viene allontanata, spostandola lungo l'asse cartesiano z, in essa",
  options: ["circola corrente in senso opposto a quello della corrente nella spira grande.", "circola corrente alternata.", "non circola alcuna corrente.", "circola corrente avente lo stesso senso della corrente della spira grande."],
  correctAnswer: 2
},

{
  id: 242,
  text: "Una spira, di cui non si conosce la forma ma di cui si sa che le dimensioni sono dell'ordine dei cm, è percorsa da una corrente continua. Il campo sull'asse della spira, a distanza di 1 m dal suo centro è pari a 20 mT. Quanto vale il campo sull'asse, ad una distanza di 10 m dal centro?",
  options: ["0", "20 μT", "Non si può rispondere senza conoscere la forma della spira.", "2 mT"],
  correctAnswer: 1
},

{
  id: 243,
  text: "Sfera carica in modo omogeneo",
  options: ["Campo elettrico nullo all'interno", "Campo elettrico costante all'interno", "Campo elettrico nullo all'esterno", "Campo elettrico costante all'esterno"],
  correctAnswer: 1
}
];

const URBETALLI_QUESTIONS = [
  {
    "id": "u1",
    "type": "matching",
    "text": "[URBETALLI] Domande su ricristallizzazione.",
    "prompts": [
      "Nel caso di leghe di alluminio, quando l'incrudimento ha dei vantaggi dal punto di vista dell'incremento delle caratteristiche meccaniche?",
      "Quando un trattamento di deformazione plastica viene definito a caldo?",
      "Come agisce il processo di ricristallizzazione sui materiali?",
      "Come agisce il processo di recovery sui materiali?"
    ],
    "options": [
      "Aumenta la deformabilità del materiale senza sostanzialmente modificare la resistenza massima rispetto a prima",
      "Aumenta la deformabilità del materiale e diminuisce la resistenza massima rispetto a prima",
      "Quando viene effettuato al di sopra della temperatura di ricristallizzazione",
      "Aumenta la deformabilità del materiale e la resistenza massima rispetto a prima",
      "Quando viene effettuato su leghe ad alta purezza",
      "Quando viene effettuato al di sotto della temperatura di ricristallizzazione"
    ],
    "correctAnswers": { "0": 5, "1": 2, "2": 1, "3": 0 }
  },
  {
    "id": "u2",
    "text": "[URBETALLI] Circa le cricche di tempra quali di queste frasi sono vere?",
    "options": [
      "(a) Nel caso di rischi di formazione di cricche si deve procedere con un trattamento di tempra isoterma martensitica",
      "(b) Esse sono provocate dalla differenza di temperatura tra cuore e superficie, come nei vetri",
      "(c) Le cricche di tempra sono provocate dalla trasformazione austenite martensite che avviene per espansione",
      "(d) Non si manifestano mai nella tempra dopo cementazione",
      "(e) Si possono evitare utilizzando un materiale con maggior quantitativo di elementi leganti"
    ],
    "correctAnswer": 0
  },
  {
    "id": "u3",
    "text": "[URBETALLI] Le famiglie di acciai da profondo stampaggio DP e TRIP manifestano sostanzialmente gli stessi intervalli di deformabilità",
    "options": ["Vero", "Falso"],
    "correctAnswer": 1
  },
  {
    "id": "u4",
    "type": "matching",
    "text": "[URBETALLI] Nel caso di leghe di alluminio da getto associare le corrette corrispondenze.",
    "prompts": [
      "Le leghe Al-Si-Mg da getto ....",
      "Per le migliori caratteristiche meccaniche di una lega da getto Al-Si ....",
      "Quale elemento dopante conferisce le migliori caratteristiche meccaniche dopo solidificazione?",
      "Quali caratteristiche meccaniche vengono raggiunte nel caso della lega Al - 5% di Si?"
    ],
    "options": [
      "Resistenza 160 MPa ed allungamento 10%",
      "Fe",
      "... si deve ottenere una morfologia di Si aciculare",
      "Resistenza 365 MPa ed allungamento 10%",
      "... invecchiamento naturale",
      "... sono leghe da trattamento termico",
      "... si deve ottenere una morfologia di Si globulare",
      "Na",
      "... non sono leghe da trattamento termico"
    ],
    "correctAnswers": { "0": 5, "1": 6, "2": 7, "3": 0 }
  },
  {
    "id": "u5",
    "type": "matching",
    "text": "[URBETALLI] Trattamento di bonifica. Inserire le corrette corrispondenze.",
    "prompts": [
      "In che cosa consiste il trattamento di bonifica?",
      "La scelta della temperatura di austenitizzazione dipende da che cosa?",
      "Su che acciai deve essere condotta la bonifica?",
      "Perche viene eseguita la bonifica?"
    ],
    "options": [
      "Dalla percentuale di C dell'acciaio",
      "Dalle applicazioni del componente",
      "Su tutti gli acciai non induriti superficialmente con % di C superiore allo 0,20%",
      "In una tempra seguita da rinvenimento",
      "Per evitare le cricche di tempra",
      "Per migliorare la finitura superficiale",
      "Per affinare la microstruttura e aumentare la tenacità",
      "Su tutti gli acciai non induriti superficialmente con % di C inferiore allo 0,20%",
      "In una tempra seguita da ricottura"
    ],
    "correctAnswers": { "0": 3, "1": 0, "2": 2, "3": 6 }
  },
  {
    "id": "u6",
    "text": "[URBETALLI] Quale tipo di microstruttura è rappresentata in figura?",
    "imageUrl": "/images/domanda_u6_microstruttura.png",
    "options": [
      "(a) Martensite in seguito a tempra di un acciaio",
      "(b) Perlite in seguito a ricottura di un C80",
      "(c) Acciaio da profondo stampaggio a basso carbonio",
      "(d) Lega Al-Si da getto senza attacco metallografico",
      "(e) Superficie di frattura duttile di acciaio"
    ],
    "correctAnswer": 3
  },
  {
    "id": "u7",
    "text": "[URBETALLI] Calcola la percentuale di perlite per un C50 dopo trattamento di ricottura completa.",
    "options": ["(a) 90%", "(b) 50%", "(c) 65%", "(d) 9%", "(e) 35%"],
    "correctAnswer": 2
  },
  {
    "id": "u8",
    "text": "[URBETALLI] Qual è il nome della seguente reazione? Liquido + Solido 1 -> Solido 2",
    "options": ["(a) Peritettoidica", "(b) Eutettoidica", "(c) Monotettica", "(d) Peritettica", "(e) Eutettica"],
    "correctAnswer": 3
  },
  {
    "id": "u9",
    "text": "[URBETALLI] Il trattamento termico riportato si riferisce a quale lega? Cosa succede? Più risposte possibili.",
    "imageUrl": "/images/domanda_u9_ciclo_termico.png",
    "options": [
      "(a) E' il ciclo del processo di nitrurazione",
      "(b) E' il trattamento di tempra e rinvenimento di acciai per utensili",
      "(c) E' il trattamento di solubilizzazione tempra ed invecchiamento di leghe di alluminio",
      "(d) E un processo di rinvenimento per ridurre il contenuto di austenite residua nell'acciaio 40 NiCrMo7-5-2",
      "(e) E' il trattamento termico T6 della lega AA 2024"
    ],
    "correctAnswer": 2
  },
  {
    "id": "u10",
    "type": "matching",
    "text": "[URBETALLI] Nel caso di processi corrosivi, attribuire la corretta corrispondenza.",
    "prompts": [
      "Cosa produce la corrosione per via umida?",
      "In quali casi si può manifestare la corrosione interstiziale?",
      "Ordine di resistenza in acqua di mare (dal più catodico): Acciai inossidabili passivati, Leghe di Al, Leghe di Ti, Ghise, Leghe di rame.",
      "Cosa produce la corrosione per vaiolatura?"
    ],
    "options": [
      "Leghe di Ti, Acciai inossidabili passivati, Leghe di rame, Ghise, Leghe di Al",
      "Quando si utilizzino delle saldature tra tubazioni dello stesso diametro",
      "Quando si utilizzino bulloni o rondelle per unire dei componenti",
      "Leghe di rame, Acciai inossidabili passivati, Leghe di Al, Ghise, Leghe di Ti",
      "Delle fessurazioni tra due superfici",
      "Dei depositi di ruggine",
      "Dei crateri di tipologia penetrante"
    ],
    "correctAnswers": { "0": 5, "1": 2, "2": 0, "3": 6 }
  },
  {
    "id": "u11",
    "type": "matching",
    "text": "[URBETALLI] Prendiamo in considerazione l'equazione di Hollomon-Jaffe.",
    "imageUrl": "/images/domanda_u11_equazione.png",
    "prompts": [
      "Qual è il campo di applicazione di tale equazione?",
      "Questa equazione descrive la temprabilità degli acciai?",
      "Qual è il significato di n nell'equazione di Hollomon-Jaffe?"
    ],
    "options": [
      "Viene utilizzata nel caso di scorrimento viscoso ad alta temperatura (creep)",
      "Si",
      "No",
      "E' un numero intero che può variare tra 1 e 100",
      "E' l'esponente di incrudimento e vale nell'intervallo 0-1",
      "Viene utilizzata nel caso di imbutitura di acciai da profondo stampaggio"
    ],
    "correctAnswers": { "0": 0, "1": 2, "2": 4 }
  },
  {
    "id": "u12",
    "text": "[URBETALLI] In riferimento al rame ed alle sue leghe:",
    "options": [
      "(a) I bronzi sono leghe di rame e stagno o Cu-Sn_Al con eventualmente P.",
      "(b) La conduttività termica del rame è superiore a quella dell'alluminio",
      "(c) Il rame per usi elettrotecnici deve essere puro ed avere un bassissimo tenore di ossigeno",
      "(d) Il piombo nel rame porta ad elevatissime caratteristiche meccaniche in seguito a solubilizzazione tempra ed invecchiamento",
      "(e) L'aggiunta di Zn come legante del rame (ottoni) fino al 32% porta ad un contemporaneo incremento di resistenza e deformabilità"
    ],
    "correctAnswer": 2
  },
  {
    "id": "u13",
    "text": "[URBETALLI] Rappresentare il ciclo termico di normalizzazione per l'acciaio 18NiCrMo7...",
    "imageUrl": "/images/domanda_u13_grafico_vuoto.jpg",
    "options": null,
    "correctAnswer": null
  }
];

const App = () => {
  const [view, setView] = useState('dashboard');
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSettings, setQuizSettings] = useState({ questionLimit: 10 });
  
  const [selectedProfessor, setSelectedProfessor] = useState('rosalbino');
  const [isMistakesSession, setIsMistakesSession] = useState(false);
  
  // --- GESTIONE MEMORIA LOCALE ---
  const [quizHistory, setQuizHistory] = useState(() => {
    const saved = localStorage.getItem('moodlePro_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [mistakeIds, setMistakeIds] = useState(() => {
    const saved = localStorage.getItem('moodlePro_mistakes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('moodlePro_history', JSON.stringify(quizHistory));
  }, [quizHistory]);

  useEffect(() => {
    localStorage.setItem('moodlePro_mistakes', JSON.stringify(mistakeIds));
  }, [mistakeIds]);

  const getActiveDatabase = () => {
    if (selectedProfessor === 'rosalbino') return ROSALBINO_QUESTIONS;
    if (selectedProfessor === 'scavino') return SCAVINO_QUESTIONS;
    return URBETALLI_QUESTIONS;
  };

  const ALL_QUESTIONS = [...ROSALBINO_QUESTIONS, ...SCAVINO_QUESTIONS, ...URBETALLI_QUESTIONS];

  // --- LOGICA QUIZ ---
  const prepareQuizQuestions = (questions, limit) => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    const actualLimit = limit ? Math.min(limit, shuffledQuestions.length) : shuffledQuestions.length;
    
    return shuffledQuestions.slice(0, actualLimit).map(q => {
      // Se è un menù a tendina, manteniamo le opzioni intatte per non corrompere la mappa delle risposte
      if (q.type === 'matching') {
        return { ...q };
      }

      const optionsWithIndices = q.options.map((opt, i) => ({ text: opt, originalIdx: i }));
      const shuffledOptions = optionsWithIndices.sort(() => Math.random() - 0.5);
      const newCorrectIdx = shuffledOptions.findIndex(o => o.originalIdx === q.correctAnswer);
      
      return { 
        ...q, 
        options: shuffledOptions.map(o => o.text), 
        correctAnswer: newCorrectIdx 
      };
    });
  };

  const startRandomQuiz = () => {
    const currentDB = getActiveDatabase();
    const limit = Math.max(1, parseInt(quizSettings.questionLimit) || 1);
    
    setActiveQuiz(prepareQuizQuestions(currentDB, limit));
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizFinished(false);
    setIsMistakesSession(false);
    setView('quiz');
  };

  const startMistakesQuiz = () => {
    const mistakeQuestions = ALL_QUESTIONS.filter(q => mistakeIds.includes(q.id));
    if (mistakeQuestions.length === 0) return;

    setActiveQuiz(prepareQuizQuestions(mistakeQuestions)); 
    setCurrentQuestionIdx(0);
    setUserAnswers({});
    setQuizFinished(false);
    setIsMistakesSession(true);
    setView('quiz');
  };

  const finalizeQuiz = () => {
    let totalScore = 0;
    const wrongIdsThisQuiz = [];
    const correctIdsThisQuiz = [];

    activeQuiz.forEach((q, qIdx) => {
      let isFullyCorrect = false;

      if (q.type === 'matching') {
        const ansObj = userAnswers[qIdx] || {};
        let promptCorrect = 0;
        
        q.prompts.forEach((_, pIdx) => {
          if (ansObj[pIdx] === q.correctAnswers[pIdx]) promptCorrect++;
        });
        
        // Punteggio parziale basato su quante tendine hai indovinato
        totalScore += (promptCorrect / q.prompts.length);
        isFullyCorrect = promptCorrect === q.prompts.length;

      } else {
        if (userAnswers[qIdx] === q.correctAnswer) {
          totalScore += 1;
          isFullyCorrect = true;
        }
      }

      if (isFullyCorrect) correctIdsThisQuiz.push(q.id);
      else wrongIdsThisQuiz.push(q.id);
    });

    const score = Math.round((totalScore / activeQuiz.length) * 100);
    
    setMistakeIds(prev => {
      let updatedMistakes = prev.filter(id => !correctIdsThisQuiz.includes(id));
      return [...new Set([...updatedMistakes, ...wrongIdsThisQuiz])];
    });

    const newResult = {
      id: Date.now().toString(),
      score, 
      total: activeQuiz.length, 
      correct: parseFloat(totalScore.toFixed(2)), 
      date: new Date().toISOString(),
      answers: userAnswers, 
      quizData: activeQuiz,
      professor: isMistakesSession ? 'Ripasso Errori' : selectedProfessor 
    };

    setQuizHistory(prev => [newResult, ...prev]);
    setQuizFinished(true);
  };

  const isQuestionAnswered = (idx) => {
    const q = activeQuiz[idx];
    if (q.type === 'matching') {
      // Per i dropdown controlla se hai risposto a TUTTE le tendine
      return userAnswers[idx] && Object.keys(userAnswers[idx]).length === q.prompts.length;
    }
    return userAnswers[idx] !== undefined;
  };

  // --- COMPONENTI GRAFICI ---
  const SidebarItem = ({ id, label, icon: Icon }) => (
    <button 
      onClick={() => setView(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all
        ${view === id ? `bg-indigo-600 text-white shadow-lg` : `text-gray-500 hover:bg-gray-100`}`}
    >
      <Icon size={20} className={view === id ? 'text-white' : 'text-gray-400'} />
      <span className="text-sm">{label}</span>
    </button>
  );

  const Dashboard = () => {
    const currentDBLength = getActiveDatabase().length;

    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-black text-gray-900 mb-2">Benvenuto, Studente</h2>
            <p className="text-gray-500 font-medium italic">preparazione quiz tmm, creato da Marco Vicari per i posteri</p>
          </div>
        </div>

        {mistakeIds.length > 0 && (
          <div className="bg-red-50 p-6 rounded-3xl border border-red-100 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in slide-in-from-top-4 duration-300">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-red-100 rounded-2xl text-red-600 shadow-inner">
                <RotateCcw size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-red-900">Hai {mistakeIds.length} {mistakeIds.length === 1 ? 'errore' : 'errori'} da ripassare</h3>
                <p className="text-sm text-red-700 font-medium mt-1">Correggili finché non scompaiono!</p>
              </div>
            </div>
            <button 
              onClick={startMistakesQuiz}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-black shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} /> AVVIA RIPASSO
            </button>
          </div>
        )}

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <User size={20} className="text-indigo-600"/> Seleziona il Modulo
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => setSelectedProfessor('rosalbino')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
                ${selectedProfessor === 'rosalbino' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 hover:border-indigo-200 text-gray-500'}`}
            >
              <span className="font-black text-lg">Prof. Rosalbino</span>
              <span className="text-xs font-bold opacity-70">{ROSALBINO_QUESTIONS.length} quesiti in archivio</span>
            </button>
            
            <button 
              onClick={() => setSelectedProfessor('scavino')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
                ${selectedProfessor === 'scavino' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 hover:border-indigo-200 text-gray-500'}`}
            >
              <span className="font-black text-lg">Prof. Scavino</span>
              <span className="text-xs font-bold opacity-70">{SCAVINO_QUESTIONS.length} quesiti in archivio</span>
            </button>

            <button 
              onClick={() => setSelectedProfessor('urbetalli')}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 text-center
                ${selectedProfessor === 'urbetalli' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-100 bg-gray-50 hover:border-indigo-200 text-gray-500'}`}
            >
              <span className="font-black text-lg">Prof. Urbetalli</span>
              <span className="text-xs font-bold opacity-70">{URBETALLI_QUESTIONS.length} quesiti in archivio</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-2 px-2">
              <Settings2 size={18} className="text-gray-400" />
              <label className="text-xs font-black text-gray-400 uppercase">Quesiti per sessione:</label>
              <input 
                type="number" 
                min="1" 
                max={currentDBLength}
                value={quizSettings.questionLimit}
                onChange={(e) => setQuizSettings({...quizSettings, questionLimit: parseInt(e.target.value) || 1})}
                className="w-16 bg-white border border-gray-200 rounded-lg px-2 py-1 text-sm font-bold text-indigo-600 outline-none focus:border-indigo-500"
              />
            </div>
            <button 
              onClick={startRandomQuiz}
              disabled={currentDBLength === 0}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl flex items-center justify-center gap-2 font-black shadow-lg transition-colors"
            >
              <Shuffle size={18} /> AVVIA TEST
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Clock size={20} className="text-indigo-600"/> Il tuo Storico Recente</h3>
          <div className="space-y-3">
            {quizHistory.length === 0 ? <p className="text-gray-400 py-4 text-center">Nessun test effettuato da te finora.</p> : 
              quizHistory.slice(0, 10).map((res) => (
                <div key={res.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl flex-wrap gap-2">
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <div className={`p-2 rounded-lg font-black text-xs ${res.score >= 60 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{res.score}%</div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-700">{res.correct}/{res.total} pt. - {new Date(res.date).toLocaleDateString()}</span>
                      <span className="text-[10px] font-black uppercase text-indigo-500 mt-0.5">
                        {res.professor === 'Ripasso Errori' ? '🔥 Ripasso Errori' : `Prof. ${res.professor}`}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    <button onClick={() => { setActiveQuiz(res.quizData); setUserAnswers(res.answers); setQuizFinished(true); setView('quiz'); }} className="text-indigo-600 font-bold text-xs p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                      Esamina
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  };

  const QuizView = () => {
    if (!activeQuiz) return null;
    
    // VISTA: REVISIONE
    if (quizFinished) {
      return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in zoom-in duration-300">
          <div className="bg-white rounded-3xl shadow-xl p-10 text-center border border-gray-100">
            <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Revisione Test</h2>
            <button onClick={() => setView('dashboard')} className="mt-8 bg-gray-900 text-white font-bold px-8 py-3 rounded-2xl hover:bg-black flex items-center gap-2 mx-auto transition-colors">
              <ChevronLeft size={20}/> Torna alla Dashboard
            </button>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 divide-y divide-gray-100">
            {activeQuiz.map((q, qIdx) => {
              
              // Calcolo correttezza per la singola domanda nella revisione
              let isUserCorrect = false;
              if (q.type === 'matching') {
                const ansObj = userAnswers[qIdx] || {};
                isUserCorrect = q.prompts.every((_, pIdx) => ansObj[pIdx] === q.correctAnswers[pIdx]);
              } else {
                isUserCorrect = userAnswers[qIdx] === q.correctAnswer;
              }

              return (
                <div key={qIdx} className="p-8">
                  <div className="flex gap-4 items-start mb-6">
                    <div className={`mt-1 p-1.5 rounded-full flex-shrink-0 ${isUserCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-700'}`}>
                      {isUserCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                    </div>
                    <div className="flex-1 w-full overflow-hidden">
                      <h4 className="text-lg font-bold text-gray-800 leading-tight mb-4">{qIdx + 1}. {q.text}</h4>
                      
                      {q.imageUrl && (
                        <div className="mb-6 flex justify-start bg-gray-50 rounded-xl p-3 border border-gray-100 w-fit">
                          <img src={q.imageUrl} alt="Immagine quesito" className="max-h-48 object-contain rounded-lg shadow-sm" />
                        </div>
                      )}

                      {/* RENDERING REVISIONE: TENDINA vs NORMALE */}
                      {q.type === 'matching' ? (
                        <div className="space-y-4">
                          {q.prompts.map((prompt, pIdx) => {
                            const ansObj = userAnswers[qIdx] || {};
                            const selectedOptIdx = ansObj[pIdx];
                            const correctOptIdx = q.correctAnswers[pIdx];
                            const isPromptCorrect = selectedOptIdx === correctOptIdx;

                            return (
                              <div key={pIdx} className={`p-4 rounded-xl border-2 ${isPromptCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                                <p className="font-bold text-sm mb-3 text-gray-800">{prompt}</p>
                                <div className="text-sm">
                                  <span className="font-semibold text-gray-600">La tua risposta: </span>
                                  <span className={isPromptCorrect ? "text-green-700 font-bold" : "text-red-700 font-bold"}>
                                    {selectedOptIdx !== undefined && selectedOptIdx !== "" ? q.options[selectedOptIdx] : "Nessuna risposta"}
                                  </span>
                                </div>
                                {!isPromptCorrect && (
                                  <div className="text-sm mt-2 pt-2 border-t border-red-200">
                                    <span className="font-semibold text-gray-600">Risposta corretta: </span>
                                    <span className="text-green-700 font-bold">{q.options[correctOptIdx]}</span>
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                          {q.options.map((option, optIdx) => {
                            const isCorrect = optIdx === q.correctAnswer;
                            const isSelected = optIdx === userAnswers[qIdx];
                            let border = "border-gray-100"; let bg = "bg-white opacity-50";
                            if (isCorrect) { border = "border-green-500"; bg = "bg-green-50 opacity-100"; }
                            else if (isSelected) { border = "border-red-500"; bg = "bg-red-50 opacity-100"; }
                            return (
                              <div key={optIdx} className={`p-4 rounded-2xl border-2 flex items-center gap-3 text-sm font-bold ${border} ${bg}`}>
                                {option}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // VISTA: QUIZ ATTIVO
    const q = activeQuiz[currentQuestionIdx];
    return (
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto items-start">
        <aside className="lg:w-64 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-fit lg:sticky lg:top-28 w-full">
          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">
            {isMistakesSession ? "Mappa Ripasso" : "Mappa Test"}
          </h4>
          <div className="grid grid-cols-5 lg:grid-cols-4 gap-2 mb-8">
            {activeQuiz.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentQuestionIdx(idx)} 
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all flex items-center justify-center 
                ${currentQuestionIdx === idx ? 'bg-indigo-600 text-white scale-110 shadow-lg' : 
                  isQuestionAnswered(idx) ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-50 text-gray-400'}`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button onClick={finalizeQuiz} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-xs hover:bg-black transition-all">CONSEGNA TEST</button>
        </aside>

        <div className="flex-1 w-full">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 min-h-[500px] flex flex-col">
            <div className="mb-10 flex justify-between items-center border-b border-gray-50 pb-6">
              <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${isMistakesSession ? 'bg-red-50 text-red-600' : 'bg-indigo-50 text-indigo-600'}`}>
                Quesito {currentQuestionIdx + 1}
              </span>
              <div className="flex gap-2">
                <button disabled={currentQuestionIdx === 0} onClick={() => setCurrentQuestionIdx(prev => prev - 1)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 disabled:opacity-30"><ChevronLeft size={20}/></button>
                <button disabled={currentQuestionIdx === activeQuiz.length - 1} onClick={() => setCurrentQuestionIdx(prev => prev + 1)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-indigo-600 disabled:opacity-30"><ChevronRight size={20}/></button>
              </div>
            </div>
            
            <h3 className={`text-2xl font-bold text-gray-800 leading-snug ${q.imageUrl ? 'mb-6' : 'mb-12'}`}>{q.text}</h3>
            
            {q.imageUrl && (
              <div className="mb-8 flex justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100 relative group overflow-hidden">
                <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-gray-500 uppercase shadow-sm">
                  <ImageIcon size={12} /> Allegato
                </div>
                <img src={q.imageUrl} alt="Immagine quesito" className="max-h-64 object-contain rounded-xl shadow-sm mix-blend-multiply" />
              </div>
            )}

            {/* RENDERING DOMANDE: TENDINE vs NORMALI */}
            {q.type === 'matching' ? (
              <div className="space-y-6 mt-auto">
                {q.prompts.map((prompt, pIdx) => {
                  const selectedValue = (userAnswers[currentQuestionIdx] && userAnswers[currentQuestionIdx][pIdx]) !== undefined 
                    ? userAnswers[currentQuestionIdx][pIdx] 
                    : "";

                  return (
                    <div key={pIdx} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-4">
                      <p className="font-bold text-gray-800 text-lg">{prompt}</p>
                      <select 
                        className="w-full p-4 rounded-xl border-2 border-gray-200 bg-white font-medium text-gray-700 outline-none focus:border-indigo-600 transition-all cursor-pointer shadow-sm appearance-none"
                        value={selectedValue}
                        onChange={(e) => {
                          const val = e.target.value === "" ? "" : parseInt(e.target.value);
                          setUserAnswers(prev => ({
                            ...prev,
                            [currentQuestionIdx]: {
                              ...(prev[currentQuestionIdx] || {}),
                              [pIdx]: val
                            }
                          }));
                        }}
                      >
                        <option value="" disabled>Scegli un'opzione...</option>
                        {q.options.map((opt, optIdx) => (
                          <option key={optIdx} value={optIdx}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-4 mt-auto">
                {q.options.map((opt, idx) => {
                  const isSelected = userAnswers[currentQuestionIdx] === idx;
                  return (
                    <button 
                      key={idx} 
                      onClick={() => setUserAnswers({...userAnswers, [currentQuestionIdx]: idx})} 
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all flex items-center gap-4 group 
                      ${isSelected ? 'border-indigo-600 bg-indigo-50' : 'border-gray-50 hover:border-indigo-200'}`}
                    >
                      <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors 
                      ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-500'}`}>
                        {String.fromCharCode(65+idx)}
                      </span>
                      <span className={`font-semibold text-lg ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>{opt}</span>
                      {isSelected && <Check size={24} className="ml-auto text-indigo-600 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] text-gray-900 pb-20 font-sans">
      <nav className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 px-6">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg"><Layout size={24} /></div>
            <span className="text-xl font-black tracking-tighter italic uppercase">quiz<span className="text-indigo-600 text-2xl">TMM</span></span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          <div className="hidden lg:flex flex-col w-64 h-[calc(100vh-120px)] sticky top-28 gap-2">
            <SidebarItem id="dashboard" label="Dashboard & Quiz" icon={Home} />
          </div>
          <div className="flex-1 min-w-0">
            {view === 'dashboard' && <Dashboard />}
            {view === 'quiz' && <QuizView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;