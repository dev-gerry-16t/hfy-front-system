const HEADER = {
  "Content-Type": "application/json",
};

const API = {
  API: "/api",
  API_SECURE: "/apiAccess",
  SYSTEM_USER: "/systemUser",
  REGISTER: "/requestSignUp",
  CUSTOMER_TYPE: "/customerType",
  CUSTOMER: "/customer",
  PERSON: "/personType",
  ENDORSEMENT: "/endorsement",
  TYPEFORM: "/typeForm",
  CATALOGS: "/catalogs",
  ADMIN: "/admin",
  LEADS: "/leads",
  HISTORIC: "/historic",
  PROVIDERS: "/providerPayment",
};

const API_CONSTANTS = {
  CATALOGS: {
    GET_ALL_INCIDENCE_PAYMENTS_METHODS: `${API.API_SECURE}${API.CATALOGS}/getAllIncidenePaymentMethods`,
    GET_ALL_CUSTOMER_FOR_INCIDENCE: `${API.API_SECURE}${API.CATALOGS}/getCustomerForIncidence`,
    GET_ALL_INCIDENCE_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllIncidenceStatus`,
    GET_ALL_INCIDENCE_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllIncidenceTypes`,
    GET_ALL_REQUEST_PROVIDER_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllRequestForProviderStatus`,
    GET_ALL_COLLABORATORS: `${API.API_SECURE}${API.CATALOGS}/getAllCollaborators`,
    GET_ALL_PROVIDER_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllProviderTypes`,
    GET_ALL_COLLABORATOR_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllCollaboratorTypes`,
    GET_ALL_PROVIDERS: `${API.API_SECURE}${API.CATALOGS}/getAllProviders`,
    GET_ALL_PROVIDER_PAYMENT_FORM: `${API.API_SECURE}${API.CATALOGS}/getAllProviderPaymentForms`,
    GET_ALL_REQUEST_ADVANCE_PYMT_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllRequestAdvancePymtStatus`,
    GET_ALL_INV_PYMT_METHODS: `${API.API_SECURE}${API.CATALOGS}/getAllInvPymtMethods`,
    GET_CATALOG_POLICY_PAYMENT_METHOD: `${API.API_SECURE}${API.CATALOGS}/getAllPolicyPaymentMethods`,
    GET_CATALOG_MARITAL_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllMaritalStatus`,
    GET_CATALOG_MARITAL_REGIME: `${API.API_SECURE}${API.CATALOGS}/getAllMaritalRegime`,
    GET_CATALOG_PROPERTY_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllPropertyTypes`,
    GET_CATALOG_POLICIES: `${API.API_SECURE}${API.CATALOGS}/getAllPolicies`,
    GET_CATALOG_NATIONALITIES: `${API.API_SECURE}${API.CATALOGS}/getAllNationalities`,
    GET_CATALOG_ID_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllIDTypes`,
    GET_CATALOG_OCCUPATIONS: `${API.API_SECURE}${API.CATALOGS}/getAllOccupations`,
    GET_CATALOG_POLICY_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllPolicyStatus`,
    GET_CATALOG_COMMERCIAL_SOCIETY_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllCommercialSocietyTypes`,
    GET_CATALOG_ALL_STATES: `${API.API_SECURE}${API.CATALOGS}/getAllStates`,
    GET_ALL_PROSPECT_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllProspectStatus`,
    GET_ALL_RELATIONSHIP_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllRelationshipTypes`,
    GET_ALL_PERSONAL_REFERENCE_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllPersonalReferenceStatus`,
    GET_ALL_REJECTION_REASONS: `${API.API_SECURE}${API.CATALOGS}/getAllRejectionReasons`,
    GET_ALL_COMMERCIAL_ACTIVITIES: `${API.API_SECURE}${API.CATALOGS}/getAllCommercialActivities`,
    GET_USERS_FOR_ASSIGNMENT: `${API.API_SECURE}${API.CATALOGS}/getUsersForAssignment`,
    GET_ALL_PROPERTY_STATES: `${API.API_SECURE}${API.CATALOGS}/getAllPropertyStates`,
    GET_ALL_INVESTIGATION_STATUS: `${API.API_SECURE}${API.CATALOGS}/getAllInvestigationStatus`,
    GET_ALL_PROPERTY_AMENITIES: `${API.API_SECURE}${API.CATALOGS}/getAllPropertyAmenities`,
    GET_ALL_PROPERTY_GENERAL_CHARACTERISTICS: `${API.API_SECURE}${API.CATALOGS}/getAllPropertyGeneralCharacteristics`,
    GET_ALL_APPLICATION_METHODS: `${API.API_SECURE}${API.CATALOGS}/getAllApplicationMethods`,
    GET_ALL_PROPERTIES: `${API.API_SECURE}${API.CATALOGS}/getAllProperties`,
    GET_ALL_PHONE_TYPES: `${API.API_SECURE}${API.CATALOGS}/getAllPhoneTypes`,
    GET_ALL_CURRENCIES: `${API.API_SECURE}${API.CATALOGS}/getAllCurrencies`,
  },
  CUSTOMER: {
    GET_CUSTOMER_TIME_LINE: `${API.CUSTOMER}/timeLine/getCustomerTimeLine`,
    GET_CUSTOMER_DATA: `${API.CUSTOMER}/customer/getCustomerData`,
    GET_CUSTOMER_DOCUMENT: `${API.CUSTOMER}/customer/getCustomerDocument`,
    SET_CUSTOMER_WORKING_INFO: `${API.CUSTOMER}/typeForm/setCustomerWorkingInfo/`,
    UPDATE_CUSTOMER_ACCOUNT: `${API.CUSTOMER}/customer/updateCustomerAccount/`,
    VALIDATE_CUSTOMER_PROPERTIES_IN_TAB: `${API.CUSTOMER}/customer/validateCustomerPropertiesInTab`,
    SET_CUSTOMER_ADDRESS: `${API.CUSTOMER}/address/setCustomerAddress/`,
    SET_CUSTOMER_EMAIL_ADDRESS: `${API.CUSTOMER}/customerEmailAddress/setCustomerEmailAddress/`,
    SET_CUSTOMER_PHONE_NUMBER: `${API.CUSTOMER}/customerPhoneNumber/setCustomerPhoneNumber/`,
    SET_CUSTOMER_BANKING_ACCOUNT: `${API.CUSTOMER}/account/setCustomerBankingAccount/`,
    SET_PERSONAL_REFERENCE: `${API.CUSTOMER}/personalReferences/setPersonalReference/`,
    SET_CUSTOMER_ENDORSEMENT: `${API.CUSTOMER}/endorsement/setCustomerEndorsement/`,
    GET_CUSTOMER_TAB_BY_ID: `${API.CUSTOMER}/customer/getCustomerTabById`,
    GET_INVESTIGATION_PROCESS_COINCIDENCES: `${API.CUSTOMER}/investigation/getInvestigationProcessCoincidences`,
    GET_USER_COINCIDENCES: `${API.CUSTOMER}/customer/getUserCoincidences`,
    GET_PROSPECT_COINCIDENCES: `${API.CUSTOMER}/prospect/getProspectCoincidences`,
    GET_INVESTIGATION_PROCESS_BY_ID: `${API.CUSTOMER}/investigation/getInvestigationProcessById`,
    GET_CUSTOMER_DATA_BY_TAB: `${API.CUSTOMER}/investigation/getCustomerDataByTab`,
    UPDATE_INVESTIGATION_PROCESS: `${API.CUSTOMER}/customer/updateInvestigationProcess/`,
    GET_PROPERTY_COINCIDENCES_V2: `${API.CUSTOMER}/property/getPropertyCoincidencesV2`,
    ADD_PROPERTY_V2: `${API.CUSTOMER}/property/addPropertyV2/`,
    SET_PROPERTY_DOCUMENT: `${API.CUSTOMER}/property/setPropertyDocument/`,
    GET_PROPERTY_BY_ID: `${API.CUSTOMER}/property/getPropertyById`,
    UPDATE_PROPERTY: `${API.CUSTOMER}/property/updateProperty/`,
    SET_PROPERTY_ASSOCIATION: `${API.CUSTOMER}/property/setPropertyAssociation/`,
    SET_ADVISER_IN_PROPERTY: `${API.CUSTOMER}/property/setAdviserInProperty/`,
    SEND_TENANT_INVITATION: `${API.CUSTOMER}/property/sendTenantInvitation/`,
    SET_APPLICANT: `${API.CUSTOMER}/property/setApplicant/`,
    APPLY_TO_PROPERTY: `${API.CUSTOMER}/property/applyToProperty/`,
    SET_FAVORITE_PROPERTY: `${API.CUSTOMER}/property/setFavoriteProperty/`,
    SET_CONTRACT: `${API.CUSTOMER}/property/setContract/`,
    GENERATE_DOCUMENT: `${API.CUSTOMER}/property/generateDocument/`,
    DEACTIVATE_CUSTOMER_DOCUMENT: `${API.CUSTOMER}/customerDocument/deactivateCustomerDocument/`,
    ADD_CUSTOMER_DOCUMENT: `${API.CUSTOMER}/customerDocument/addCustomerDocument/`,
    GET_LOCATION_FILTER: `${API.CUSTOMER}/zipCode/getLocationFilter`,
    GET_ORDER_PAYMENT_BY_ID: `${API.CUSTOMER}/orderPayment/getOrderPaymentById`,
    PROCESS_INVITATION: `${API.CUSTOMER}/invitation/processInvitation/`,
    GET_VERIFICATION_IDENTITY_COINCIDENCES: `${API.CUSTOMER}/verificationIdentity/getVerificationIdentityCoincidences`,
    SET_CONTRACT_APPROVEMENT: `${API.CUSTOMER}/contract/setContractApprovement/`,
    GET_CUSTOMER_DETAIL_BY_ID: `${API.CUSTOMER}/customer/getCustomerDetailById`,
    REQUEST_PROPERTY_CONTACT: `${API.CUSTOMER}/property/requestPropertyContact/`,
    GET_ADVISER_STATS: `${API.CUSTOMER}/customer/getAdviserStats`,
    GET_USER_STATS: `${API.CUSTOMER}/loginHistory/getUserStats`,
    GET_ADVISER_RANKING: `${API.CUSTOMER}/customer/getAdviserRanking`,
  },
  GET_PROPERTY_BY_ID: `${API.API}/property/getPropertyById`,
  PROCESS_INVITATION: `${API.API}/invitation/processInvitation/`,
  GET_CATALOG_AMOUNT_FOR_GW_TRANSACTION: `${API.API_SECURE}${API.PROVIDERS}/getCatalogAmountForGWTransaction`,
  GET_CONFIRM_PAYMENT_INTENT: `${API.API_SECURE}${API.PROVIDERS}/getConfirmPaymentIntent`,
  GET_CONFIRM_RETRIEVE_PAYMENT_INTENT: `${API.API_SECURE}${API.PROVIDERS}/getConfirmRetrievePaymentIntent`,
  PAYMENT_SERVICE: `${API.API_SECURE}${API.PROVIDERS}/getAmountForGWTransaction`,
  PAYMENT_SERVICE_CARD: `${API.API_SECURE}${API.PROVIDERS}/getAmountForGWTransactionCard`,
  GET_REQUEST_PROVIDER_PROPIERTIES_V2: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderProperties/v2`,
  GET_REQUEST_PROVIDER_PROPIERTIES: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderProperties`,
  ADD_INCIDENCE: `${API.API_SECURE}${API.PROVIDERS}/addIncidence`,
  SIGN_REQUEST_FOR_PROVIDER: `${API.API_SECURE}${API.PROVIDERS}/signRequestForProvider/`,
  UPDATE_INCIDENCE: `${API.API_SECURE}${API.PROVIDERS}/updateIncidence/`,
  UPDATE_MOVING_DIALOG: `${API.API_SECURE}${API.PROVIDERS}/updateMovingDialog`,
  GET_REQUEST_PROVIDER_FOR_TENANT: `${API.API_SECURE}${API.PROVIDERS}/addRequestForProvider`,
  GET_REQUEST_PROVIDER_BY_ID: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderById`,
  GET_INCIDENCE_COINCIDENCES: `${API.API_SECURE}${API.PROVIDERS}/getIncidenceCoincidences`,
  GET_REQUEST_PROVIDER_COINCIDENCES: `${API.API_SECURE}${API.PROVIDERS}/getRequestForProviderCoincidences`,
  UPDATE_REQUEST_PROVIDER: `${API.API_SECURE}${API.PROVIDERS}/updateRequestForProvider/`,
  SET_PROVIDER: `${API.API_SECURE}${API.PROVIDERS}/setProvider/`,
  GET_PROVIDER_BY_ID: `${API.API_SECURE}${API.PROVIDERS}/getProviderById`,
  GET_INCIDENCE_BY_ID: `${API.API_SECURE}${API.PROVIDERS}/getIncidenceById`,
  GET_ALL_PROVIDERS_COINCIDENCES: `${API.API_SECURE}${API.PROVIDERS}/getProviderCoincidences`,
  GET_ALL_CUSTOMER_BY_ID: `${API.API_SECURE}/customer/getCustomerById`,
  GET_NOTIFICATIONS: `${API.API_SECURE}/customer/getNotifications`,
  UPDATE_NOTIFICATIONS: `${API.API_SECURE}/customer/updateNotifications/`,
  GET_ALL_PYMENT_TYPES: `${API.API_SECURE}/customer/getAllPayments`,
  GET_ALL_PYMENT_CONTRACT: `${API.API_SECURE}/customer/getAllPaymentInContract`,
  GET_ALL_CUSTOMER_TENANT_BY_ID: `${API.API_SECURE}/customer/getCustomerTenantsById`,
  GET_ALL_CUSTOMER_TENANT_DASHBOARD_BY_ID: `${API.API_SECURE}/customer/getCustTenantDashboardById`,
  GET_ALL_CUSTOMER_TENANT_COINCIDENCES: `${API.API_SECURE}/customer/getTenantCoincidences`,
  ADD_CUSTOMER_MESSAGE: `${API.API_SECURE}/customer/addCustomerMessage`,
  GET_CUSTOMER_MESSAGE: `${API.API_SECURE}/customer/getCustomerMessage`,
  CUSTOMER_ADD_PROPERTY: `${API.API_SECURE}/customer/addProperty`,
  GET_ALL_DOCUMENT_TYPES: `${API.API_SECURE}/customer/getAllDocumentTypes`,
  GET_PAYMENT_IN_CONTRACT_DOCUMENT: `${API.API_SECURE}/customer/getPaymentInContractDocument`,
  GET_ALL_PROPERTIES: `${API.API_SECURE}/customer/getAllProperties`,
  GET_ALL_DEPARTMENTS: `${API.API_SECURE}/customer/getApartments`,
  REQUEST_ADVANCEMENT_RENTS: `${API.API_SECURE}/customer/requestAdvancement`,
  SEND_TENANT_INVITATION: `${API.API_SECURE}/customer/tenantInvitation`,
  GET_ALL_STATS_CHART: `${API.API_SECURE}/customer/statsCharts`,
  GET_ZIP_CODE_ADRESS: `${API.API_SECURE}/customer/getAdressZipCode`,
  GET_ALL_TENANTS_CATALOG: `${API.API_SECURE}/customer/getCustomerTenants`,
  GET_ALL_BANKS_CATALOG: `${API.API_SECURE}/customer/getAllBanks`,
  GET_AGENT_INDICATORS: `${API.API_SECURE}/customer/getAgentIndicators`,
  GET_AGENT_CONTRACT_COINCIDENCES: `${API.API_SECURE}/customer/getAgentContractCoincidences`,
  UPDATE_INVITATION: `${API.API_SECURE}/customer/updateInvitation/`,
  GET_PROPERTY_COINCIDENCES: `${API.API_SECURE}/customer/getPropertyCoincidences`,
  GET_AGENT_COMISSION_CHART: `${API.API_SECURE}/customer/getAgentCommissionChart`,
  GET_REQUEST_ADVANCE_PYMT_PLAN: `${API.API_SECURE}/customer/getRequestAdvancePymtPlan`,
  GET_CUSTOMER_LOAN: `${API.API_SECURE}/customer/getCustomerLoan`,
  UPDATE_CUSTOMER_LOAN: `${API.API_SECURE}/customer/updateCustomerLoan/`,
  FORGIVE_INTEREST: `${API.API_SECURE}/customer/forgiveInterest/`,
  GET_REQUEST_ADVANCE_PYMT_PROPERTIES: `${API.API_SECURE}/customer/getRequestAdvancePymtProperties`,
  GET_CUSTOMER_LOAN_PROPERTIES: `${API.API_SECURE}/customer/getCustomerLoanProperties`,
  GET_TRANSACTIONS_BY_USER: `${API.API_SECURE}/customer/getTransactionsByUser`,
  GET_USER_PROFILE: `${API.API_SECURE}${API.SYSTEM_USER}/userProfile`,
  GET_MENU_PROFILE: `${API.API_SECURE}${API.SYSTEM_USER}/menuProfile`,
  SET_IMAGE_PROFILE: `${API.API_SECURE}${API.SYSTEM_USER}/setUserProfile/`,
  SET_THEME_PROFILE: `${API.API_SECURE}${API.SYSTEM_USER}/setUserProfileTheme/`,
  LOGIN: `${API.API}${API.SYSTEM_USER}/validateLogin`,
  GET_REQUEST_EXTERNAL_DS: `${API.API}${API.SYSTEM_USER}/getRequestExternalDS`,
  SET_REQUEST_EXTERNAL_DS: `${API.API}${API.SYSTEM_USER}/setRequestExternalDS/`,
  GET_ALL_CUSTOMER_TYPES: `${API.API}${API.CUSTOMER_TYPE}/getAllCustomer`,
  GET_ALL_CUSTOMER_INVITATION: `${API.API}${API.CUSTOMER_TYPE}/getInvitation/`,
  GET_ALL_PERSON_TYPES: `${API.API}${API.PERSON}/getAllPerson`,
  GET_ALL_ENDORSEMENT: `${API.API}${API.ENDORSEMENT}/getAllEndorsement`,
  REGISTER: `${API.API}${API.REGISTER}`,
  REQUEST_RECOVERY_PASS: `${API.API}/requestRecoveryPass`,
  VERIFY_CODE_RECOVERY_PASS: `${API.API}/verifyCodeRecoveryPass`,
  RECOVERY_PASS: `${API.API}/recoveryPass/`,
  VERIFY_CODE_REGISTER: `${API.API}${API.REGISTER}/verifyCode`,
  ADD_DOCUMENT: `${API.API_SECURE}/addDocument`,
  ADD_DOCUMENT_THUMB: `${API.API_SECURE}/addDocumentThumb`,
  GET_TYPEFORM_TENANT: `${API.API_SECURE}${API.TYPEFORM}/getTypeForm`,
  GET_TYPEFORM_OWNER: `${API.API_SECURE}${API.TYPEFORM}/getCustomerTypeForm`,
  SET_TYPEFORM_REFERENCES: `${API.API_SECURE}${API.TYPEFORM}/setTypeFormReference`,
  SET_TYPEFORM_DOCUMENT_TENANT: `${API.API_SECURE}${API.TYPEFORM}/setTypeForm`,
  SET_TYPEFORM_OWNER: `${API.API_SECURE}${API.TYPEFORM}/setTypeFormOwner`,
  GET_TYPEFORM_DOCUMENT_TENANT: `${API.API_SECURE}${API.TYPEFORM}/getTypeFormDocument`,
  PUT_ADD_TYPEFORM_DOCUMENT: `${API.API_SECURE}${API.TYPEFORM}/addTypeFormDocument/`,
  GET_TYPEFORM_PROPERTIES: `${API.API_SECURE}${API.TYPEFORM}/getTypeFormProperties`,
  VALIDATE_TYPE_FORM_PROPERTIES: `${API.API_SECURE}${API.TYPEFORM}/validateTypeFormProperties`,
  GET_CONTRACT_STATS: `${API.API_SECURE}${API.ADMIN}/getContractStats`,
  GET_CONTRACT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getContractCoincidences`,
  GET_CONTRACT_CHART: `${API.API_SECURE}${API.ADMIN}/getContractIndicatorsChart`,
  GET_SEARCH_CUSTOMER: `${API.API_SECURE}${API.ADMIN}/searchCustomer`,
  GET_ADD_PROSPECT: `${API.API_SECURE}${API.ADMIN}/addProspect`,
  GET_DETAIL_CUSTOMER: `${API.API_SECURE}${API.ADMIN}/getByIdContract`,
  GET_DETAIL_CUSTOMER_TENANT: `${API.API_SECURE}${API.ADMIN}/getTenantByIdContract`,
  GET_DETAIL_CUSTOMER_AGENT: `${API.API_SECURE}${API.ADMIN}/getAgentByIdContract`,
  SET_UPDATE_CONTRACT: `${API.API_SECURE}${API.ADMIN}/updateContract/`,
  SET_SWITCH_CUSTOMER_CONTRACT: `${API.API_SECURE}${API.ADMIN}/switchCustomerInContract/`,
  GET_CONTRACT: `${API.API_SECURE}${API.ADMIN}/getContract/v2`,
  GET_CONTRACT_COMMENT: `${API.API_SECURE}${API.ADMIN}/getContractComment`,
  SET_CONTRACT: `${API.API_SECURE}${API.ADMIN}/setContract/`,
  ADD_CONTRACT_COMMENT: `${API.API_SECURE}${API.ADMIN}/addContractComment/`,
  GET_CONTRACT_DOCUMENT: `${API.API_SECURE}${API.ADMIN}/getDigitalContractDocument`,
  ADD_CONTRACT_DOCUMENT: `${API.API_SECURE}${API.ADMIN}/addDigitalContractDocument/`,
  ADD_CONTRACT_DOCUMENT_ID: `${API.API_SECURE}${API.ADMIN}/addContractDocument/`,
  GET_CONTRACT_DOCUMENT_BYID: `${API.API_SECURE}${API.ADMIN}/getDocumentByIdContract`,
  GET_CUSTOMER_AGENT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getCustomerAgentCoincidences`,
  GET_LEGAL_CONTRACT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getLegalContractCoincidences`,
  GET_REQUEST_ADVANCE_PYMT_COINCIDENCES: `${API.API_SECURE}${API.ADMIN}/getRequestAdvancePymtCoincidences`,
  GET_REQUEST_ADVANCE_PYMT_BY_ID: `${API.API_SECURE}${API.ADMIN}/getRequestAdvancePymtById`,
  SET_PERSONAL_REFERENCE_FORM: `${API.API_SECURE}${API.ADMIN}/setPersonalReferenceForm/`,
  UPDATE_REQUEST_ADVANCE_PYM: `${API.API_SECURE}${API.ADMIN}/updateRequestAdvancePym/`,
  UPDATE_PROSPECT_INVITATION: `${API.API_SECURE}${API.ADMIN}/updateProspectInvitation/`,
  GET_TRANSACTIONS: `${API.API_SECURE}${API.ADMIN}/getTransactions`,
  GET_LANDING_PROSPECT_COINCIDENECES: `${API.API_SECURE}${API.LEADS}/getLandingProspectCoincidences`,
  GET_LANDING_PROSPECT_STATS: `${API.API_SECURE}${API.LEADS}/getLandingProspectStats`,
  UPDATE_LANDING_PROSPECT_STATUS: `${API.API_SECURE}${API.LEADS}/updateLandingProspect/`,
  BULK_POTENTIAL_AGENT: `${API.API_SECURE}${API.LEADS}/bulkPotentialAgent`,
  GET_POTENTIAL_AGENT_COINCIDENCES: `${API.API_SECURE}${API.LEADS}/getPotentialAgentCoincidences`,
  GET_LANDING_PROSPECT_BY_ID: `${API.API_SECURE}${API.LEADS}/getLandingProspectById`,
  GET_ALL_COUNTRIES: `${API.API}${API.LEADS}/catalog/getAllCountries`,
  GET_AUDIT_REFERENCES: `${API.API_SECURE}${API.HISTORIC}/getAudit`,
};

export { API_CONSTANTS, HEADER };
