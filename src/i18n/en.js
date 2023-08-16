import { minLength } from '@vuelidate/validators'

export default {
  auth: {
    signin: 'Sign In',
    reservedArea: 'Reserved Area',
    loginSuccess: "You're logged in successfully",
    loginFailed: 'wrong email or password',
    logoutSuccess: "You're logged out successfully"
  },

  validations: {
    required: 'This field is required',
    email: 'This field must be a valid email address',
    password: 'This field must be at least 8 characters long',
    minLength: 'This field must be at least {min} characters long',
    date: {
      fromBeforeTo: 'The start date must be before the end date',
      oneDateRequired: 'At least one date is required'
    }
  },

  request: {
    direction: 'direction',
    status: 'status',
    startedAt: 'started at',
    endedAt: 'ended at',
    source: 'source',
    destination: 'destination',
    request: 'request',
    response: 'response',
    IN: 'inbound',
    OUT: 'outbound',
    id_event: 'Event ID',
    id_request: 'Request ID',
    id_activity: 'Activity ID',
    id_appointment: 'Appointment ID',
    he_request: 'Request Headers',
    bo_request: 'Request Body',
    he_response: 'Response Headers',
    bo_response: 'Response Body'
  },

  menu: {
    dashboard: 'Dashboard',
    user: 'Account',
    logout: 'Logout',
    inbound: 'Inbound',
    outbound: 'Outbound',
    all: 'All',
    requests: 'Requests'
  },

  pages: {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Welcome to the dashboard',
      viewList: 'View list',
      totalRequests: 'Total requests'
    },
    requests: {
      title: 'Requests',
      subtitle: 'List of requests',
      startedAt: 'Started at',
      tableTitle: 'Requests list',
      found: 'Found'
    },
    requestShow: {
      title: 'Request details',
      subtitle: 'Request details',
      request: 'Request',
      response: 'Response',
      status: 'Status',
      startedAt: 'Started at',
      endedAt: 'Ended at',
      requestDetails: 'Request details',
      failedRequests: 'Some requests failed, click to the icon for reprocessing them'
    },

    errors: {
      404: {
        title: 'Page not found',
        message: 'The page you are looking for does not exist',
        link: 'Go to the dashboard'
      }
    }
  },

  utility: {
    filters: 'Filters'
  },

  filters: {
    title: 'Filters',
    searchbar: 'Find for UUID or destination',
    apply: 'Apply filters',
    direction: {
      title: 'Direction',
      all: 'All',
      inbound: 'Inbound',
      outbound: 'Outbound',
      IN: 'Inbound',
      OUT: 'Outbound'
    },
    status: {
      title: 'Status',
      OK: 'Completed with success',
      PEND: 'Pending',
      ERR: 'Failed',
      KO: 'Completed with errors'
    },
    date: {
      title: 'Started at',
      from: 'from',
      to: 'to'
    },
    time: {
      title: 'Select a time range',
      oneHour: 'Last hour',
      sixHours: 'Last 6 hours',
      oneDay: 'Last 24 hours',
      oneWeek: 'Last week',
      oneMonth: 'Last month',
      selectDate: 'Select a date',
      dateHour: 'Date/hour'
    },
    endpoint: {
      title: 'Destination'
    },
    source: {
      title: 'Source'
    },
    destination: {
      title: 'Destination'
    }
  },

  theme: {
    title: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'System'
  },

  alert: {
    login: {
      title: 'Login',
      success: "You're logged in successfully ",
      failed: 'Login failed',
      failed_text: 'Check your email and password'
    },
    logout: {
      title: 'Logout',
      success: "You're logged out successfully",
      failed: 'Logout failed'
    },
    session_expired: {
      title: 'Session expired',
      message: 'Your session has expired, please login again',
      button: 'Go to login page'
    },
    server_error: {
      title: 'Server error',
      message: 'An error occurred during the request to the server',
      button: 'Escape'
    }
  }
}
