import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import { ScanAlert } from '@/type';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #e5e7eb',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  alertContainer: {
    marginBottom: 20,
    padding: 15,
    border: '1 solid #e5e7eb',
    borderRadius: 4
  },
  alertHeader: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10
  },
  riskBadge: {
    padding: '2 8',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold'
  },
  section: {
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#374151'
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  gridItem: {
    width: '50%',
    marginBottom: 5
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5
  }
});

interface TechnicalReportPDFProps {
  alerts: ScanAlert[];
  targetInfo: {
    url: string;
    webServer: string;
    ipAddress: string;
  };
}

export const TechnicalReportPDF = ({ alerts, targetInfo }: TechnicalReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Technical Security Report</Text>
        <Text style={styles.text}>Target: {targetInfo.url}</Text>
        <Text style={styles.text}>Server: {targetInfo.webServer}</Text>
        <Text style={styles.text}>IP Address: {targetInfo.ipAddress}</Text>
      </View>

      {alerts.map((alert, index) => (
        <View key={alert.id} style={styles.alertContainer}>
          <View style={styles.alertHeader}>
            <Text style={styles.alertTitle}>{alert.name}</Text>
            <View style={[styles.riskBadge, { backgroundColor: getRiskColor(alert.risk) }]}>
              <Text style={{ color: '#ffffff' }}>{alert.risk}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.text}>{alert.description}</Text>
          </View>

          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.label}>URL:</Text> {alert.url}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.label}>Method:</Text> {alert.method}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.label}>Confidence:</Text> {alert.confidence}
              </Text>
            </View>
            <View style={styles.gridItem}>
              <Text style={styles.text}>
                <Text style={styles.label}>CWE ID:</Text> {alert.cweid}
              </Text>
            </View>
          </View>

          {alert.solution && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Solution</Text>
              <Text style={styles.text}>{alert.solution}</Text>
            </View>
          )}

          {alert.reference && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>References</Text>
              <Text style={styles.text}>{alert.reference}</Text>
            </View>
          )}
        </View>
      ))}
    </Page>
  </Document>
);

const getRiskColor = (risk: string) => {
  switch (risk.toLowerCase()) {
    case 'high':
      return '#ef4444';
    case 'medium':
      return '#f59e0b';
    case 'low':
      return '#3b82f6';
    default:
      return '#6b7280';
  }
}; 