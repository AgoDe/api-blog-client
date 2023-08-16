import { minLength } from '@vuelidate/validators'

export default {
  auth: {
    signin: 'Accedi',
    reservedArea: 'Area riservata',
    loginSuccess: 'Login avvenuto con successo',
    loginFailed: 'Credenziali errate',
    logoutSuccess: 'Logout avvenuto con successo'
  },

  validations: {
    required: 'Questo campo è obbligatorio',
    email: 'Inserisci un indirizzo email valido',
    password: 'La password deve contenere almeno 8 caratteri',
    minLength: 'Questo campo deve essere lungo almeno {min} caratteri',
    date: {
      fromBeforeTo: 'La data di inizio deve essere precedente alla data di fine',
      oneDateRequired: 'Devi inserire almeno una data'
    }
  },

  // request: {
  //   direction: 'direzione',
  //   status: 'stato',
  //   startedAt: 'data inizio',
  //   endedAt: 'data fine',
  //   source: 'sorgente',
  //   destination: 'destinazione',
  //   request: 'richiesta',
  //   response: 'risposta',
  //   IN: 'in entrata',
  //   OUT: 'in uscita',
  //   id_event: 'ID Evento',
  //   id_request: 'ID Richiesta',
  //   id_activity: 'ID Attività',
  //   id_appointment: 'ID Appuntamento',
  //   he_request: 'Headers Richiesta',
  //   bo_request: 'Body Richiesta',
  //   he_response: 'Headers Risposta',
  //   bo_response: 'Body Risposta',
  //   searchPlaceholder: 'Cerca per UUID, headers e body della richiesta e della risposta'
  // },
  post: {
    'title': 'Titolo',
    'createdAt': 'Data',
  },

  menu: {
    dashboard: 'Dashboard',
    posts_index: 'Tutti',
    posts_create: 'Crea nuovo',
    user: 'Account utente',
    logout: 'Logout',

  },

  pages: {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Statistiche e informazioni generali',
      viewList: 'Vedi lista richieste',
      totalRequests: 'Richieste totali'
    },
    requests: {
      title: 'Richieste server',
      subtitle: 'Tutte le richieste effettuate al server',
      startedAt: 'Data inizio',
      tableTitle: 'Elenco richieste',
      found: 'richieste trovate | richiesta trovata | richieste trovate'
    },
    posts: {
      index: {
        title: 'Post',
        subtitle: '',
        tableTitle: 'Tutti i tuoi post',
        found: 'post trovati | post trovato | post trovati'

      },
      show: {
        title: "Dettaglio Post"
      }
    },
    requestShow: {
      title: 'Dettagli richiesta',
      subtitle: 'Informazioni dettagliate sulla richiesta',
      request: 'Richiesta',
      response: 'Risposta',
      status: 'Stato',
      startedAt: 'Data inizio',
      endedAt: 'Data fine',
      requestDetails: 'Dettagli richiesta',
      failedRequests:
        "Non tutte le richieste sono state completate con successo, clicca sull'icona per rieseguire la prima chiamata."
    },

    errors: {
      404: {
        title: 'Pagina non trovata',
        message: 'La pagina che stai cercando non esiste',
        link: 'Torna alla dashboard'
      }
    }
  },

  utility: {
    filters: 'filtri'
  },

  filters: {
    title: 'Filtri',
    searchbar: 'Cerca per UUID, o per destinazione',
    apply: 'Applica filtri',
    direction: {
      title: 'Direzione',
      all: 'Tutte',
      inbound: 'In entrata',
      outbound: 'In uscita',
      IN: 'In entrata',
      OUT: 'In uscita'
    },
    status: {
      title: 'Stato',
      OK: 'Completate con successo',
      PEND: 'In attesa',
      ERR: 'Fallite',
      KO: 'Completate con errori'
    },
    date: {
      title: 'Data Inizio',
      from: 'da',
      to: 'a'
    },
    time: {
      title: 'Scegli un intervallo di tempo',
      oneHour: 'Ultima ora',
      sixHours: 'Ultime 6 ore',
      oneDay: 'Ultime 24 ore',
      oneWeek: 'Ultima settimana',
      oneMonth: 'Ultimo mese',
      selectDate: 'Seleziona data/ora',
      dateHour: 'Data/ora'
    },
    endpoint: {
      title: 'Endpoint',
      sybil: 'Sybil',
      cup: 'CUP'
    },
    source: {
      title: 'Sorgente'
    }
  },

  theme: {
    title: 'Tema',
    light: 'Chiaro',
    dark: 'Scuro',
    system: 'Sistema'
  },

  alert: {
    login: {
      title: 'Login',
      success: 'Login avvenuto con successo',
      failed: 'Credenziali errate',
      failed_text: 'Controlla le credenziali e riprova',
      server_error: 'Errore server',
      server_error_text: 'Si è verificato un errore durante la richiesta al server'
    },
    logout: {
      title: 'Logout',
      success: 'Logout avvenuto con successo',
      failed: 'Non è stato possibile effettuare il logout'
    },
    session_expired: {
      title: 'Sessione scaduta',
      message: 'La tua sessione è scaduta, per continuare effettua nuovamente il login',
      button: 'Vai al Login'
    },
    server_error: {
      title: 'Errore server',
      message: 'Si è verificato un errore durante la richiesta al server',
      button: 'Esci dalla pagina'
    }
  }
}
