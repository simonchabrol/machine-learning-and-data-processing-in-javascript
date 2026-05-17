────────────────────────────────────────────────────────────────────────────────


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  REPOSITORY OVERVIEW                                                       │
  └────────────────────────────────────────────────────────────────────────────┘

    This repository is a comprehensive collection of JavaScript modules covering
    a wide spectrum of backend engineering and data science topics. Authored by
    Simon Chabrol and released under the MIT License, it is freely usable,
    modifiable, and redistributable.

    Language breakdown: JavaScript (74.8%), HTML (25.2%). The primary runtime is
    Node.js, with Deno used in the deno_server module. The repository
    accumulates 484 commits, reflecting active, iterative development sustained
    over time.

    Topics: visualization, nodejs, javascript, html, api, machine-learning, etl,
    databases, filetransfer, deno, boolean-parser.

    URL: https://github.com/simonchabrol/machine-learning-and-data-processing-
    in-javascript


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  PURPOSE & DESIGN PHILOSOPHY                                               │
  └────────────────────────────────────────────────────────────────────────────┘

    The repository is designed as a modular playground where each subdirectory
    is a self-contained mini-project demonstrating a specific pattern or
    technique. Rather than a single monolithic application, this structure
    allows developers to explore individual concepts in isolation — a didactic
    approach that makes the codebase ideal for learning, reference, and
    experimentation.

    The choice of JavaScript as the primary language reflects the growing
    relevance of Node.js in data engineering and machine learning pipelines,
    particularly in contexts where teams want to avoid introducing Python as a
    secondary runtime. The Deno module further signals an interest in the
    evolving JavaScript server landscape.


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  MODULE DIRECTORY                                                          │
  └────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────┬──────────────────────────────────────────────┐
  │            MODULE            │                 DESCRIPTION                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ api_databases                │ Connects Node.js apps to databases via REST  │
  │                              │ APIs, covering CRUD operations and query     │
  │                              │ handling.                                    │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ auth_api                     │ Implements authentication workflows (login,  │
  │                              │ registration, token management) using JWT or │
  │                              │ session-based strategies.                    │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ boolean_parser               │ Parses and evaluates boolean expressions     │
  │                              │ from strings — useful for dynamic query      │
  │                              │ building or rule engines.                    │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ cluster_example              │ Illustrates Node.js clustering to spawn      │
  │                              │ multiple worker processes and exploit multi- │
  │                              │ core CPUs.                                   │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ data_processing              │ General-purpose data transformation          │
  │                              │ utilities: filtering, mapping, and           │
  │                              │ aggregating structured datasets in memory.   │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ data_visualization           │ Generates interactive charts and graphs in   │
  │                              │ HTML using charting libraries for in-browser │
  │                              │ data exploration.                            │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ dataframe                    │ Implements a pandas-like DataFrame structure │
  │                              │ in JavaScript for tabular data manipulation  │
  │                              │ and column operations.                       │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ deno_server                  │ A REST server built with the Deno runtime,   │
  │                              │ showcasing Deno's built-in TypeScript        │
  │                              │ support and permission model.                │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ etl                          │ Extract, Transform, Load pipeline: reads raw │
  │                              │ data, applies transformations, and writes to │
  │                              │ a target store.                              │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ file_transfer                │ Handles file upload/download over HTTP, with │
  │                              │ support for chunked transfer and progress    │
  │                              │ tracking.                                    │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ long_polling                 │ Implements the long-polling HTTP pattern for │
  │                              │ near-real-time communication without         │
  │                              │ WebSockets.                                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ machine_learning             │ Core ML algorithms from scratch in JS:       │
  │                              │ regression, classification, clustering, and  │
  │                              │ neural network basics.                       │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ mock_database                │ An in-memory mock database for testing,      │
  │                              │ simulating CRUD operations without a real DB │
  │                              │ dependency.                                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ scheduler                    │ A job scheduler that runs tasks at defined   │
  │                              │ intervals or specific times, akin to a cron  │
  │                              │ system in Node.js.                           │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ shared_hosting               │ Patterns for deploying Node.js apps in       │
  │                              │ shared-hosting environments with resource    │
  │                              │ constraints.                                 │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ signature_api                │ API for generating and verifying digital     │
  │                              │ signatures, useful for webhook validation or │
  │                              │ document signing.                            │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ tictactoe                    │ A fully functional Tic-Tac-Toe game with an  │
  │                              │ AI opponent using minimax game-tree search.  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ timestamp_api                │ Endpoints for timestamp generation, parsing, │
  │                              │ and formatting in multiple timezone and      │
  │                              │ locale formats.                              │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ worker_threads               │ Demonstrates Node.js Worker Threads for CPU- │
  │                              │ intensive parallel tasks running in separate │
  │                              │ threads.                                     │
  └──────────────────────────────┴──────────────────────────────────────────────┘


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  KEY TECHNICAL HIGHLIGHTS                                                  │
  └────────────────────────────────────────────────────────────────────────────┘


  ▸ Machine Learning from Scratch
  ─────────────────────────────────

    The machine_learning module is arguably the most technically ambitious part
    of the repository. Implementing ML algorithms — regression, classification,
    clustering — without external libraries in JavaScript is a rare and
    instructive exercise. It forces a deep understanding of the mathematical
    foundations: gradient descent, distance metrics, and activation functions,
    rather than relying on black-box implementations.


  ▸ Parallel Computing
  ──────────────────────

    The worker_threads and cluster_example modules address one of JavaScript's
    most significant historical weaknesses: CPU-bound parallelism. Node.js has
    long been celebrated for I/O concurrency via its event loop, but true multi-
    threading requires deliberate use of the Worker Threads API or the cluster
    module. These two projects demonstrate both approaches side by side — a
    sophisticated comparison rarely found in beginner repositories.


  ▸ ETL Pipeline
  ────────────────

    The etl module implements a canonical data engineering pattern — Extract,
    Transform, Load — entirely in JavaScript. This is increasingly relevant as
    JavaScript-based data stacks (DuckDB-WASM, Danfo.js, Observable) gain
    traction. The module demonstrates that Node.js can serve as a lightweight
    orchestrator for data workflows without the overhead of a full Python
    environment.


  ▸ DataFrame Implementation
  ────────────────────────────

    Building a DataFrame abstraction from scratch is a significant undertaking.
    It requires careful design of data structures for columnar access, lazy
    evaluation, and chainable operations. This module demonstrates a deep
    understanding of how libraries like Pandas work internally, rather than just
    how to use them.


  ▸ Security Primitives
  ───────────────────────

    The auth_api and signature_api modules cover two foundational security
    concerns: user authentication and data integrity verification. Their
    presence in the repository signals an attention to production-grade concerns
    that goes well beyond simple CRUD applications.


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  ARCHITECTURE & REPOSITORY STRUCTURE                                       │
  └────────────────────────────────────────────────────────────────────────────┘

    The flat top-level structure — one directory per concept — is a deliberate
    choice that prioritises discoverability over deep nesting. Each module can
    be cloned or copied independently, which aligns perfectly with the
    repository's educational purpose. The mix of pure Node.js and Deno also
    signals cross-runtime awareness, a hallmark of a developer keeping pace with
    the evolving JavaScript ecosystem.

    The HTML component (25.2% of the codebase) is primarily concentrated in the
    data_visualization module, where client-side rendering logic lives alongside
    the server-side Node.js code. This full-stack approach within a single
    module — backend API combined with a frontend chart — reflects a practical,
    end-to-end mindset.


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  POTENTIAL USE CASES                                                       │
  └────────────────────────────────────────────────────────────────────────────┘

    This repository serves naturally as a teaching resource for JavaScript-based
    data engineering and ML. Each module works as a reference implementation for
    common backend patterns such as authentication, scheduling, or file
    transfer. The modules also make excellent starting points for prototypes in
    Node.js or Deno, and the machine_learning module in particular is valuable
    study material for understanding how ML algorithms work under the hood —
    which makes it useful for interview preparation for full-stack or data
    engineering roles.

────────────────────────────────────────────────────────────────────────────────
────────────────────────────────────────────────────────────────────────────────


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  PRÉSENTATION DU DÉPÔT                                                     │
  └────────────────────────────────────────────────────────────────────────────┘

    Ce dépôt est une collection complète de modules JavaScript couvrant un large
    spectre allant du backend engineering à la data science. Créé par Simon
    Chabrol et distribué sous licence MIT, il est librement utilisable,
    modifiable et redistribuable.

    Langages : JavaScript (74,8 %), HTML (25,2 %). Le runtime principal est
    Node.js, Deno étant utilisé dans le module deno_server. Le dépôt
    comptabilise 484 commits, témoignant d'un développement actif et itératif
    soutenu dans le temps.

    Topics : visualization, nodejs, javascript, html, api, machine-learning,
    etl, databases, filetransfer, deno, boolean-parser.

    URL : https://github.com/simonchabrol/machine-learning-and-data-processing-
    in-javascript


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  OBJECTIF & PHILOSOPHIE DE CONCEPTION                                      │
  └────────────────────────────────────────────────────────────────────────────┘

    Le dépôt est conçu comme un terrain de jeu modulaire où chaque sous-
    répertoire est un mini-projet autonome illustrant un pattern ou une
    technique spécifique. Plutôt qu'une application monolithique, cette
    structure permet aux développeurs d'explorer des concepts individuellement —
    une approche didactique qui rend la base de code idéale pour
    l'apprentissage, la référence et l'expérimentation.

    Le choix de JavaScript comme langage principal reflète la montée en
    puissance de Node.js dans les pipelines de data engineering et de machine
    learning, notamment dans les contextes où les équipes souhaitent éviter
    d'introduire Python comme runtime secondaire. Le module Deno signale par
    ailleurs un intérêt pour l'évolution de l'écosystème serveur JavaScript.


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  RÉPERTOIRE DES MODULES                                                    │
  └────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────┬──────────────────────────────────────────────┐
  │            MODULE            │                 DESCRIPTION                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ api_databases                │ Connecte des applications Node.js à des      │
  │                              │ bases de données via des API REST, avec      │
  │                              │ opérations CRUD.                             │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ auth_api                     │ Implémente des flux d'authentification       │
  │                              │ (connexion, inscription, tokens) avec JWT ou │
  │                              │ sessions.                                    │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ boolean_parser               │ Analyse et évalue des expressions booléennes │
  │                              │ depuis des chaînes — utile pour des requêtes │
  │                              │ dynamiques.                                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ cluster_example              │ Illustre le clustering Node.js pour lancer   │
  │                              │ plusieurs processus workers sur des CPU      │
  │                              │ multi-cœurs.                                 │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ data_processing              │ Utilitaires de transformation de données :   │
  │                              │ filtrage, mapping, agrégation de datasets    │
  │                              │ structurés.                                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ data_visualization           │ Génère des graphiques interactifs en HTML    │
  │                              │ pour l'exploration de données dans le        │
  │                              │ navigateur.                                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ dataframe                    │ Implémente une structure DataFrame similaire │
  │                              │ à pandas en JavaScript pour données          │
  │                              │ tabulaires.                                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ deno_server                  │ Serveur REST sous Deno, démontrant le        │
  │                              │ support TypeScript natif et le modèle de     │
  │                              │ permissions.                                 │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ etl                          │ Pipeline ETL : extraction, transformation et │
  │                              │ chargement de données dans un système cible. │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ file_transfer                │ Gère l'upload/download de fichiers en HTTP   │
  │                              │ avec transfert fragmenté et suivi de         │
  │                              │ progression.                                 │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ long_polling                 │ Implémente le long-polling HTTP pour une     │
  │                              │ communication quasi temps-réel sans          │
  │                              │ WebSockets.                                  │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ machine_learning             │ Algorithmes ML from scratch en JS :          │
  │                              │ régression, classification, clustering,      │
  │                              │ réseaux de neurones.                         │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ mock_database                │ Base de données simulée en mémoire pour les  │
  │                              │ tests, reproduisant les opérations CRUD sans │
  │                              │ vraie DB.                                    │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ scheduler                    │ Planificateur de tâches qui exécute des jobs │
  │                              │ à intervalles définis, similaire à cron.     │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ shared_hosting               │ Configurations et patterns pour déployer des │
  │                              │ apps Node.js en hébergement mutualisé.       │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ signature_api                │ API de génération et vérification de         │
  │                              │ signatures numériques pour webhooks ou       │
  │                              │ documents.                                   │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ tictactoe                    │ Jeu de Morpion complet avec un adversaire IA │
  │                              │ via la recherche minimax dans l'arbre de     │
  │                              │ jeu.                                         │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ timestamp_api                │ Endpoints de génération, parsing et          │
  │                              │ formatage d'horodatages multi-fuseaux        │
  │                              │ horaires.                                    │
  ├──────────────────────────────┼──────────────────────────────────────────────┤
  │ worker_threads               │ Illustre les Worker Threads Node.js pour du  │
  │                              │ parallélisme CPU dans des threads séparés.   │
  └──────────────────────────────┴──────────────────────────────────────────────┘


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  POINTS TECHNIQUES SAILLANTS                                               │
  └────────────────────────────────────────────────────────────────────────────┘


  ▸ Machine Learning from Scratch
  ─────────────────────────────────

    Le module machine_learning est sans doute la partie la plus ambitieuse du
    dépôt. Implémenter des algorithmes ML — régression, classification,
    clustering — sans bibliothèques externes en JavaScript est un exercice rare
    et formateur. Il oblige à comprendre en profondeur les fondements
    mathématiques : descente de gradient, métriques de distance et fonctions
    d'activation, plutôt que de s'appuyer sur des implémentations boîte noire.


  ▸ Parallélisme et multi-threading
  ───────────────────────────────────

    Les modules worker_threads et cluster_example adressent l'une des faiblesses
    historiques de JavaScript : le parallélisme lié au CPU. Node.js a longtemps
    été célébré pour sa concurrence I/O via la boucle d'événements, mais le vrai
    multi-threading nécessite l'utilisation délibérée de l'API Worker Threads ou
    du module cluster. Ces deux projets démontrent les deux approches côte à
    côte — une comparaison sophistiquée rarement présente dans des dépôts
    débutants.


  ▸ Pipeline ETL
  ────────────────

    Le module etl implémente un pattern canonique du data engineering —
    Extraire, Transformer, Charger — entièrement en JavaScript. C'est de plus en
    plus pertinent alors que les stacks de données JavaScript (DuckDB-WASM,
    Danfo.js, Observable) gagnent du terrain. Le module montre que Node.js peut
    servir d'orchestrateur léger pour des workflows de données sans l'overhead
    d'un environnement Python complet.


  ▸ Implémentation d'un DataFrame
  ─────────────────────────────────

    Construire une abstraction DataFrame from scratch est un travail conséquent.
    Il requiert une conception soigneuse des structures de données pour l'accès
    colonnaire, l'évaluation paresseuse et les opérations chaînables. Ce module
    témoigne d'une compréhension profonde du fonctionnement interne de
    bibliothèques comme Pandas — et non pas seulement de leur utilisation.


  ▸ Primitives de sécurité
  ──────────────────────────

    Les modules auth_api et signature_api couvrent deux préoccupations de
    sécurité fondamentales : l'authentification des utilisateurs et la
    vérification de l'intégrité des données. Leur présence dans le dépôt révèle
    une attention aux exigences de production allant bien au-delà des simples
    applications CRUD.


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  ARCHITECTURE & STRUCTURE DU DÉPÔT                                         │
  └────────────────────────────────────────────────────────────────────────────┘

    La structure plate au premier niveau — un répertoire par concept — est un
    choix délibéré qui favorise la découvrabilité sur l'imbrication profonde.
    Chaque module peut être cloné ou copié indépendamment, ce qui s'aligne
    parfaitement avec la vocation pédagogique du dépôt. Le mélange de Node.js
    pur et de Deno signale également une conscience multi-runtime, signe d'un
    développeur au fait de l'évolution de l'écosystème JavaScript.

    La composante HTML (25,2 % de la base de code) est principalement concentrée
    dans le module data_visualization, où la logique de rendu côté client
    coexiste avec le code Node.js côté serveur. Cette approche full-stack au
    sein d'un seul module — API backend combinée à un graphique frontend —
    reflète une mentalité pratique et de bout en bout.


  ┌────────────────────────────────────────────────────────────────────────────┐
  │  CAS D'USAGE POTENTIELS                                                    │
  └────────────────────────────────────────────────────────────────────────────┘

    Ce dépôt constitue naturellement une ressource pédagogique pour le data
    engineering et le ML en JavaScript. Chaque module fonctionne comme une
    implémentation de référence pour des patterns backend courants tels que
    l'authentification, la planification ou le transfert de fichiers. Les
    modules servent également de points de départ pour des prototypes en Node.js
    ou Deno, et le module machine_learning en particulier représente un
    excellent matériel d'étude pour comprendre le fonctionnement interne des
    algorithmes ML — ce qui le rend très utile pour préparer des entretiens pour
    des postes full-stack ou data engineering.

────────────────────────────────────────────────────────────────────────────────
