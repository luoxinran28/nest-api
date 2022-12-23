/* eslint-disable */
/** Execute `npm run compileSchema` to regenerate **/

// -----------------------------------------------

export interface AuthorizeRequest {
  idTag: string;
}
// -----------------------------------------------

export interface AuthorizeResponse {
  idTagInfo: {
    status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
    expiryDate?: string;
    parentIdTag?: string;
    [k: string]: unknown;
  };
}
// -----------------------------------------------

export interface BootNotificationRequest {
  chargePointVendor: string;
  chargePointModel: string;
  chargePointSerialNumber?: string;
  chargeBoxSerialNumber?: string;
  firmwareVersion?: string;
  iccid?: string;
  imsi?: string;
  meterType?: string;
  meterSerialNumber?: string;
}
// -----------------------------------------------

export interface BootNotificationResponse {
  status: "Accepted" | "Pending" | "Rejected";
  currentTime: string;
  interval: number;
}
// -----------------------------------------------

export interface CancelReservationRequest {
  reservationId: number;
}
// -----------------------------------------------

export interface CancelReservationResponse {
  status: "Accepted" | "Rejected";
}
// -----------------------------------------------

export interface ChangeAvailabilityRequest {
  connectorId: number;
  type: "Inoperative" | "Operative";
}
// -----------------------------------------------

export interface ChangeAvailabilityResponse {
  status: "Accepted" | "Rejected" | "Scheduled";
}
// -----------------------------------------------

export interface ChangeConfigurationRequest {
  key: string;
  value: string;
}
// -----------------------------------------------

export interface ChangeConfigurationResponse {
  status: "Accepted" | "Rejected" | "RebootRequired" | "NotSupported";
}
// -----------------------------------------------

export interface ClearCacheRequest {}
// -----------------------------------------------

export interface ClearCacheResponse {
  status: "Accepted" | "Rejected";
}
// -----------------------------------------------

export interface ClearChargingProfileRequest {
  id?: number;
  connectorId?: number;
  chargingProfilePurpose?: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
  stackLevel?: number;
}
// -----------------------------------------------

export interface ClearChargingProfileResponse {
  status: "Accepted" | "Unknown";
}
// -----------------------------------------------

export interface DataTransferRequest {
  vendorId: string;
  messageId?: string;
  data?: string;
}
// -----------------------------------------------

export interface DataTransferResponse {
  status: "Accepted" | "Rejected" | "UnknownMessageId" | "UnknownVendorId";
  data?: string;
}
// -----------------------------------------------

export interface DiagnosticsStatusNotificationRequest {
  status: "Idle" | "Uploaded" | "UploadFailed" | "Uploading";
}
// -----------------------------------------------

export interface DiagnosticsStatusNotificationResponse {}
// -----------------------------------------------

export interface FirmwareStatusNotificationRequest {
  status: "Downloaded" | "DownloadFailed" | "Downloading" | "Idle" | "InstallationFailed" | "Installing" | "Installed";
}
// -----------------------------------------------

export interface FirmwareStatusNotificationResponse {}
// -----------------------------------------------

export interface GetCompositeScheduleRequest {
  connectorId: number;
  duration: number;
  chargingRateUnit?: "A" | "W";
}
// -----------------------------------------------

export interface GetCompositeScheduleResponse {
  status: "Accepted" | "Rejected";
  connectorId?: number;
  scheduleStart?: string;
  chargingSchedule?: {
    duration?: number;
    startSchedule?: string;
    chargingRateUnit: "A" | "W";
    chargingSchedulePeriod: {
      startPeriod: number;
      limit: number;
      numberPhases?: number;
      [k: string]: unknown;
    }[];
    minChargingRate?: number;
    [k: string]: unknown;
  };
}
// -----------------------------------------------

export interface GetConfigurationRequest {
  key?: string[];
}
// -----------------------------------------------

export interface GetConfigurationResponse {
  configurationKey?: {
    key: string;
    readonly: boolean;
    value?: string;
    [k: string]: unknown;
  }[];
  unknownKey?: string[];
}
// -----------------------------------------------

export interface GetDiagnosticsRequest {
  location: string;
  retries?: number;
  retryInterval?: number;
  startTime?: string;
  stopTime?: string;
}
// -----------------------------------------------

export interface GetDiagnosticsResponse {
  fileName?: string;
}
// -----------------------------------------------

export interface GetLocalListVersionRequest {}
// -----------------------------------------------

export interface GetLocalListVersionResponse {
  listVersion: number;
}
// -----------------------------------------------

export interface HeartbeatRequest {}
// -----------------------------------------------

export interface HeartbeatResponse {
  currentTime: string;
}
// -----------------------------------------------

export interface MeterValuesRequest {
  connectorId: number;
  transactionId?: number;
  meterValue: {
    timestamp: string;
    sampledValue: {
      value: string;
      context?:
        | "Interruption.Begin"
        | "Interruption.End"
        | "Sample.Clock"
        | "Sample.Periodic"
        | "Transaction.Begin"
        | "Transaction.End"
        | "Trigger"
        | "Other";
      format?: "Raw" | "SignedData";
      measurand?:
        | "Energy.Active.Export.Register"
        | "Energy.Active.Import.Register"
        | "Energy.Reactive.Export.Register"
        | "Energy.Reactive.Import.Register"
        | "Energy.Active.Export.Interval"
        | "Energy.Active.Import.Interval"
        | "Energy.Reactive.Export.Interval"
        | "Energy.Reactive.Import.Interval"
        | "Power.Active.Export"
        | "Power.Active.Import"
        | "Power.Offered"
        | "Power.Reactive.Export"
        | "Power.Reactive.Import"
        | "Power.Factor"
        | "Current.Import"
        | "Current.Export"
        | "Current.Offered"
        | "Voltage"
        | "Frequency"
        | "Temperature"
        | "SoC"
        | "RPM";
      phase?: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
      location?: "Cable" | "EV" | "Inlet" | "Outlet" | "Body";
      unit?:
        | "Wh"
        | "kWh"
        | "varh"
        | "kvarh"
        | "W"
        | "kW"
        | "VA"
        | "kVA"
        | "var"
        | "kvar"
        | "A"
        | "V"
        | "K"
        | "Celcius"
        | "Fahrenheit"
        | "Percent";
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  }[];
}
// -----------------------------------------------

export interface MeterValuesResponse {}
// -----------------------------------------------

export interface RemoteStartTransactionRequest {
  connectorId?: number;
  idTag: string;
  chargingProfile?: {
    chargingProfileId: number;
    transactionId?: number;
    stackLevel: number;
    chargingProfilePurpose: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
    chargingProfileKind: "Absolute" | "Recurring" | "Relative";
    recurrencyKind?: "Daily" | "Weekly";
    validFrom?: string;
    validTo?: string;
    chargingSchedule: {
      duration?: number;
      startSchedule?: string;
      chargingRateUnit: "A" | "W";
      chargingSchedulePeriod: {
        startPeriod: number;
        limit: number;
        numberPhases?: number;
        [k: string]: unknown;
      }[];
      minChargingRate?: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
}
// -----------------------------------------------

export interface RemoteStartTransactionResponse {
  status: "Accepted" | "Rejected";
}
// -----------------------------------------------

export interface RemoteStopTransactionRequest {
  transactionId: number;
}
// -----------------------------------------------

export interface RemoteStopTransactionResponse {
  status: "Accepted" | "Rejected";
}
// -----------------------------------------------

export interface ReserveNowRequest {
  connectorId: number;
  expiryDate: string;
  idTag: string;
  parentIdTag?: string;
  reservationId: number;
}
// -----------------------------------------------

export interface ReserveNowResponse {
  status: "Accepted" | "Faulted" | "Occupied" | "Rejected" | "Unavailable";
}
// -----------------------------------------------

export interface ResetRequest {
  type: "Hard" | "Soft";
}
// -----------------------------------------------

export interface ResetResponse {
  status: "Accepted" | "Rejected";
}
// -----------------------------------------------

export interface SendLocalListRequest {
  listVersion: number;
  localAuthorizationList?: {
    idTag: string;
    idTagInfo?: {
      expiryDate?: string;
      parentIdTag?: string;
      status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
      [k: string]: unknown;
    };
    [k: string]: unknown;
  }[];
  updateType: "Differential" | "Full";
}
// -----------------------------------------------

export interface SendLocalListResponse {
  status: "Accepted" | "Failed" | "NotSupported" | "VersionMismatch";
}
// -----------------------------------------------

export interface SetChargingProfileRequest {
  connectorId: number;
  csChargingProfiles: {
    chargingProfileId: number;
    transactionId?: number;
    stackLevel: number;
    chargingProfilePurpose: "ChargePointMaxProfile" | "TxDefaultProfile" | "TxProfile";
    chargingProfileKind: "Absolute" | "Recurring" | "Relative";
    recurrencyKind?: "Daily" | "Weekly";
    validFrom?: string;
    validTo?: string;
    chargingSchedule: {
      duration?: number;
      startSchedule?: string;
      chargingRateUnit: "A" | "W";
      chargingSchedulePeriod: {
        startPeriod: number;
        limit: number;
        numberPhases?: number;
        [k: string]: unknown;
      }[];
      minChargingRate?: number;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
}
// -----------------------------------------------

export interface SetChargingProfileResponse {
  status: "Accepted" | "Rejected" | "NotSupported";
}
// -----------------------------------------------

export interface StartTransactionRequest {
  connectorId: number;
  idTag: string;
  meterStart: number;
  reservationId?: number;
  timestamp: string;
}
// -----------------------------------------------

export interface StartTransactionResponse {
  idTagInfo: {
    expiryDate?: string;
    parentIdTag?: string;
    status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
    [k: string]: unknown;
  };
  transactionId: number;
}
// -----------------------------------------------

export interface StatusNotificationRequest {
  connectorId: number;
  errorCode:
    | "ConnectorLockFailure"
    | "EVCommunicationError"
    | "GroundFailure"
    | "HighTemperature"
    | "InternalError"
    | "LocalListConflict"
    | "NoError"
    | "OtherError"
    | "OverCurrentFailure"
    | "PowerMeterFailure"
    | "PowerSwitchFailure"
    | "ReaderFailure"
    | "ResetFailure"
    | "UnderVoltage"
    | "OverVoltage"
    | "WeakSignal";
  info?: string;
  status:
    | "Available"
    | "Preparing"
    | "Charging"
    | "SuspendedEVSE"
    | "SuspendedEV"
    | "Finishing"
    | "Reserved"
    | "Unavailable"
    | "Faulted";
  timestamp?: string;
  vendorId?: string;
  vendorErrorCode?: string;
}
// -----------------------------------------------

export interface StatusNotificationResponse {}
// -----------------------------------------------

export interface StopTransactionRequest {
  idTag?: string;
  meterStop: number;
  timestamp: string;
  transactionId: number;
  reason?:
    | "EmergencyStop"
    | "EVDisconnected"
    | "HardReset"
    | "Local"
    | "Other"
    | "PowerLoss"
    | "Reboot"
    | "Remote"
    | "SoftReset"
    | "UnlockCommand"
    | "DeAuthorized";
  transactionData?: {
    timestamp: string;
    sampledValue: {
      value: string;
      context?:
        | "Interruption.Begin"
        | "Interruption.End"
        | "Sample.Clock"
        | "Sample.Periodic"
        | "Transaction.Begin"
        | "Transaction.End"
        | "Trigger"
        | "Other";
      format?: "Raw" | "SignedData";
      measurand?:
        | "Energy.Active.Export.Register"
        | "Energy.Active.Import.Register"
        | "Energy.Reactive.Export.Register"
        | "Energy.Reactive.Import.Register"
        | "Energy.Active.Export.Interval"
        | "Energy.Active.Import.Interval"
        | "Energy.Reactive.Export.Interval"
        | "Energy.Reactive.Import.Interval"
        | "Power.Active.Export"
        | "Power.Active.Import"
        | "Power.Offered"
        | "Power.Reactive.Export"
        | "Power.Reactive.Import"
        | "Power.Factor"
        | "Current.Import"
        | "Current.Export"
        | "Current.Offered"
        | "Voltage"
        | "Frequency"
        | "Temperature"
        | "SoC"
        | "RPM";
      phase?: "L1" | "L2" | "L3" | "N" | "L1-N" | "L2-N" | "L3-N" | "L1-L2" | "L2-L3" | "L3-L1";
      location?: "Cable" | "EV" | "Inlet" | "Outlet" | "Body";
      unit?:
        | "Wh"
        | "kWh"
        | "varh"
        | "kvarh"
        | "W"
        | "kW"
        | "VA"
        | "kVA"
        | "var"
        | "kvar"
        | "A"
        | "V"
        | "K"
        | "Celcius"
        | "Fahrenheit"
        | "Percent";
      [k: string]: unknown;
    }[];
    [k: string]: unknown;
  }[];
}
// -----------------------------------------------

export interface StopTransactionResponse {
  idTagInfo?: {
    expiryDate?: string;
    parentIdTag?: string;
    status: "Accepted" | "Blocked" | "Expired" | "Invalid" | "ConcurrentTx";
    [k: string]: unknown;
  };
}
// -----------------------------------------------

export interface TriggerMessageRequest {
  requestedMessage:
    | "BootNotification"
    | "DiagnosticsStatusNotification"
    | "FirmwareStatusNotification"
    | "Heartbeat"
    | "MeterValues"
    | "StatusNotification";
  connectorId?: number;
}
// -----------------------------------------------

export interface TriggerMessageResponse {
  status: "Accepted" | "Rejected" | "NotImplemented";
}
// -----------------------------------------------

export interface UnlockConnectorRequest {
  connectorId: number;
}
// -----------------------------------------------

export interface UnlockConnectorResponse {
  status: "Unlocked" | "UnlockFailed" | "NotSupported";
}
// -----------------------------------------------

export interface UpdateFirmwareRequest {
  location: string;
  retries?: number;
  retrieveDate: string;
  retryInterval?: number;
}
// -----------------------------------------------

export interface UpdateFirmwareResponse {}
