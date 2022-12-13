export interface Station {
  id: number;

  identity?: string;

  vendor?: string;

  model?: string;

  centralSystemUrl?: string;

  meterValue?: number;

  chargeInProgress?: boolean;

  currentTransactionId?: number;

  currentChargingPower?: number;

  createdAt: Date;

  updatedAt: Date;
}
