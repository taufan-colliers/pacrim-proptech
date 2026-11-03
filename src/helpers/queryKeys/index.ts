import type { IdClient } from '@/types/apiResponses';

const dashboardReport = {
  all: ['dashboardReport'] as const,
  lists: () => [...dashboardReport.all, 'list'] as const,
  list: (filters: {
    idWebUser: number | undefined;
    idClient: undefined | number;
  }) => [...dashboardReport.lists(), { filters }] as const,
  details: () => [...dashboardReport.all, 'detail'] as const,
  detail: (id: number) => [...dashboardReport.details(), id] as const,
};

const workRequest = {
  all: ['workRequest'] as const,
  lists: () => [...workRequest.all, 'list'] as const,
  list: (filters: unknown) => [...workRequest.lists(), filters] as const,
  details: () => [...workRequest.all, 'detail'] as const,
  detail: (id: number | undefined) => [...workRequest.details(), id] as const,
  detailPhotos: (id: number | undefined) =>
    [...workRequest.details(), id, 'photos'] as const,
};

const costApprovalOutstanding = {
  all: ['costApprovalOutstanding'] as const,
  lists: () => [...costApprovalOutstanding.all, 'list'] as const,
  list: (filters: unknown) =>
    [...costApprovalOutstanding.lists(), filters] as const,
  details: () => [...costApprovalOutstanding.all, 'detail'] as const,
  detail: (id: number | undefined) =>
    [...costApprovalOutstanding.details(), id] as const,
};

const costApprovalHistory = {
  all: ['costApprovalHistory'] as const,
  lists: () => [...costApprovalHistory.all, 'list'] as const,
  list: (filters: unknown) =>
    [...costApprovalHistory.lists(), filters] as const,
  details: () => [...costApprovalHistory.all, 'detail'] as const,
  detail: (id: number | undefined) =>
    [...costApprovalHistory.details(), id] as const,
};

const employees = {
  all: ['employees'] as const,
  lists: () => [...employees.all, 'list'] as const,
  list: (filters: unknown) => [...employees.lists(), filters] as const,
  details: () => [...employees.all, 'detail'] as const,
  detail: (id: number) => [...employees.details(), id] as const,
  detailFilter: (id: number) => [...employees.details(), id] as const,
};

const propertyGroup = {
  all: ['propertyGroup'] as const,
  lists: ({
    keyword,
    idClient,
  }: {
    idClient: number | undefined;
    keyword?: string | null;
  }) => [...propertyGroup.all, 'list', idClient, keyword] as const,
};

const workRequestCategory = {
  all: ['workRequestCategory'] as const,
  lists: (idClient: number | undefined) =>
    [...workRequestCategory.all, 'list', idClient] as const,
};

const additionalInformation = {
  all: ['additionalInformation'] as const,
  lists: (idClient: number | undefined) =>
    [...additionalInformation.all, 'list', idClient] as const,
};

const filterPropertyGroup = {
  all: ['filterPropertyGroup'] as const,
  lists: ({
    idEmployee,
    idClient,
    role,
    status,
  }: {
    idClient: number | undefined;
    idEmployee?: number | null | undefined;
    role?: string | null | undefined;
    status?: string | null | undefined;
  }) =>
    [
      ...filterPropertyGroup.all,
      'list',
      idClient,
      idEmployee,
      role,
      status,
    ] as const,
};

const filterProperty = {
  all: ['filterProperty'] as const,
  lists: ({
    idEmployee,
    idClient,
    role,
    status,
    idPropertyGroup,
  }: {
    idClient: number | undefined;
    idEmployee?: number | null | undefined;
    idPropertyGroup?: number | null | undefined;
    role?: string | null | undefined;
    status?: string | null | undefined;
  }) =>
    [
      ...filterProperty.all,
      'list',
      idClient,
      idEmployee,
      status,
      idPropertyGroup,
      role,
    ] as const,
};

const filterCategory = {
  all: ['filterCategory'] as const,
  lists: ({
    idEmployee,
    idClient,
    role,
    status,
  }: {
    idClient: number | undefined;
    idEmployee?: number | null | undefined;
    role?: string | null | undefined;
    status?: string | null | undefined;
  }) =>
    [
      ...filterCategory.all,
      'list',
      idClient,
      idEmployee,
      role,
      status,
    ] as const,
};

const filterStatus = {
  all: ['filterStatus'] as const,
  lists: ({
    idEmployee,
    idClient,
    role,
    status,
  }: {
    idClient: number | undefined;
    idEmployee?: number | null | undefined;
    role?: string | null | undefined;
    status?: string | null | undefined;
  }) =>
    [...filterStatus.all, 'list', idClient, idEmployee, role, status] as const,
};

const propertiesLocation = {
  all: ['propertiesLocation'] as const,
  lists: (keyword?: string | null) =>
    [...propertiesLocation.all, 'list', keyword] as const,
  list: ({
    idPropertyGroup,
    keyword,
  }: {
    idPropertyGroup: number;
    keyword?: string | null;
  }) => [...propertiesLocation.lists(), idPropertyGroup, keyword] as const,
};

const propertyFloors = {
  all: ['propertyFloors'] as const,
  lists: (keyword?: string | null) =>
    [...propertyFloors.all, 'list', keyword] as const,
  list: ({
    idProperty,
    keyword,
  }: {
    idProperty: number | null | undefined;
    keyword?: string | null;
  }) => [...propertyFloors.lists(), idProperty, keyword] as const,
};

const propertyZones = {
  all: ['propertyZones'] as const,
  lists: (keyword?: string | null) =>
    [...propertyZones.all, 'list', keyword] as const,
  list: ({
    idPropertyFloor,
    keyword,
  }: {
    idPropertyFloor: number | null | undefined;
    keyword?: string | null;
  }) => [...propertyZones.lists(), idPropertyFloor, keyword] as const,
};

const relatedAssets = {
  all: ['relatedAssets'] as const,
  lists: () => [...relatedAssets.all, 'list'] as const,
  list: (filters: unknown) => [...relatedAssets.lists(), filters] as const,
  details: () => [...relatedAssets.all, 'detail'] as const,
  detail: (id: number) => [...relatedAssets.details(), id] as const,
  detailScan: (url: string | null | undefined) =>
    [...relatedAssets.details(), url] as const,
};

const serviceProvider = {
  all: ['serviceProvider'] as const,
  lists: (idClient: number | undefined) =>
    [...serviceProvider.all, 'list', idClient] as const,
};

const workers = {
  all: ['workers'] as const,
  lists: ({
    idWorkRequest,
    idServiceProvider,
  }: {
    idWorkRequest: number | string | undefined;
    idServiceProvider?: number | string | undefined;
  }) => [...workers.all, 'list', idWorkRequest, idServiceProvider] as const,
};

const timeClockVerify = ({
  idEmployee,
  idReference,
}: {
  idEmployee: number | undefined;
  idReference: number;
}) => ['timeClockVerify', idEmployee, idReference];

const timeClockStatus = ({
  idEmployee,
  idReference,
}: {
  idEmployee: number | undefined;
  idReference: number;
}) => ['timeClockStatus', idEmployee, idReference];

const notificationsGeneral = {
  all: ['notificationsGeneral'] as const,
  lists: (idClient: number | undefined) =>
    [...notificationsGeneral.all, 'list', idClient] as const,
};

const notificationsCostApproval = {
  all: ['notificationsCostApproval'] as const,
  lists: (idClient: number | undefined) =>
    [...notificationsCostApproval.all, 'list', idClient] as const,
};

const costApprovalFlow = (idTracking: number | undefined | null) => [
  'costApprovalFlow',
  idTracking,
];

const notificationWorkRequest = {
  all: ['notificationWorkRequest'] as const,
  lists: ({
    idEmployee,
    idClient,
  }: {
    idEmployee: number | undefined;
    idClient: IdClient;
  }) => [...notificationWorkRequest.all, 'list', idClient, idEmployee] as const,
};

const userInfo = ['userInfo'],
  accessList = ['accessList'],
  adjudicate = ['adjudicate'],
  deletePhoto = ['deletePhoto'],
  assignWorkers = ['assignWorkers'],
  clientActive = ['clientActive'],
  clientSwitch = ['clientSwitch'],
  costApprovalAdjudicateRequest = ['costApprovalAdjudicateRequest'],
  loginKey = ['login'],
  resolve = ['resolve'],
  sendOTP = ['sendOTP'],
  submitFeedback = ['submitFeedback'],
  updateProgress = ['updateProgress'],
  sendChat = ['sendChat'],
  timeClockUpdateStatus = ['timeClockUpdateStatus'],
  uploadPhoto = ['uploadPhoto'],
  verifyOTP = ['verifyOTP'],
  verifyTOTP = ['verifyTOTP'],
  currencies = ['currencies'],
  submitWorkRequest = ['submitWorkRequest'];

/**
 * Central React Query keys. Every query/mutation key used by the app lives here so
 * invalidation stays typo-free.
 */
const queryKeys = {
  accessList,
  updateProgress,
  additionalInformation,
  adjudicate,
  assignWorkers,
  deletePhoto,
  clientActive,
  clientSwitch,
  costApprovalAdjudicateRequest,
  costApprovalFlow,
  costApprovalHistory,
  costApprovalOutstanding,
  currencies,
  dashboardReport,
  employees,
  filterCategory,
  filterProperty,
  filterPropertyGroup,
  filterStatus,
  loginKey,
  notificationsCostApproval,
  notificationsGeneral,
  notificationWorkRequest,
  propertiesLocation,
  propertyFloors,
  propertyGroup,
  propertyZones,
  relatedAssets,
  resolve,
  sendChat,
  sendOTP,
  serviceProvider,
  submitFeedback,
  submitWorkRequest,
  timeClockStatus,
  timeClockUpdateStatus,
  timeClockVerify,
  uploadPhoto,
  userInfo,
  verifyOTP,
  verifyTOTP,
  workers,
  workRequest,
  workRequestCategory,
};

export default queryKeys;
