
export interface MetricConfig {
  id: string;
  name: string;
  dataConfig: DataConfig;
  displayConfig: DisplayConfig;
}

export interface DataConfig {
  datasetType: string;
  dataSource: string;
  referenceKey: string;
  query: string;
  valueMapping: string;
  previousValueField: string;
}

export interface DisplayConfig {
  showTooltip: boolean;
  tooltipInfo: string;
  showLatestUpdatedTime: boolean;
  showComparisonMode: boolean;
  showPreviousValue: boolean;
  layout: {
    height: number;
    padding: number;
    horizontalAlignment: 'Left' | 'Center' | 'Right';
    verticalAlignment: 'Top' | 'Middle' | 'Bottom';
    contentPadding: number;
  };
  typography: {
    titleSize: number;
    titleWeight: string;
    valueSize: number;
    valueWeight: string;
    comparisonSize: number;
  };
  formatting: {
    dataType: string;
    displayFormat: string;
    decimalPlaces: number;
    useThousandsSeparator: boolean;
  };
  style: {
    backgroundColor: string;
    titleColor: string;
    valueColor: string;
    subTextColor: string;
  };
}

export const DEFAULT_CONFIG: MetricConfig = {
  id: 'gross-booking',
  name: 'Gross Booking',
  dataConfig: {
    datasetType: 'Real-time',
    dataSource: 'view_jus_vn_billing_delivery_recharge',
    referenceKey: '',
    query: `SELECT 
SUM(CASE WHEN order_created_datetime=date'2025-12-02' then total_rev_vnd end)/1 current,
SUM(CASE WHEN order_created_datetime=date'2025-12-01' then total_rev_vnd end)/1 compare,
(SUM(CASE WHEN order_created_datetime=date'2025-12-02' then total_rev_vnd end)-SUM(CASE WHEN order_created_datetime=date'2025-12-01' then total_rev_vnd end))/SUM(CASE WHEN order_created_datetime=date'2025-12-01' then total_rev_vnd end) as dod
FROM view_jus_vn_billing_delivery_recharge
WHERE order_created_datetime in (date'2025-12-02',date'2025-12-01')`,
    valueMapping: 'current',
    previousValueField: 'compare'
  },
  displayConfig: {
    showTooltip: true,
    tooltipInfo: "Total value of successful transactions, including taxes but excluding refunds.\n● Latency: realtime\n● Log type: register/login\n● Source: in-game",
    showLatestUpdatedTime: false,
    showComparisonMode: true,
    showPreviousValue: true,
    layout: {
      height: 118,
      padding: 10,
      horizontalAlignment: 'Left',
      verticalAlignment: 'Middle',
      contentPadding: 12
    },
    typography: {
      titleSize: 14,
      titleWeight: 'Regular',
      valueSize: 24,
      valueWeight: 'Semi-bold',
      comparisonSize: 12
    },
    formatting: {
      dataType: 'Number',
      displayFormat: 'Full',
      decimalPlaces: 0,
      useThousandsSeparator: true
    },
    style: {
      backgroundColor: '#FFFFFF',
      titleColor: '#1D293D',
      valueColor: '#1D293D',
      subTextColor: '#1D293D'
    }
  }
};
