import { Bar, Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto';
import data from '../sample-data.json';

Chart.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);


const App: React.FC = () => {
  const totalActivityData = {
    labels: data.data.AuthorWorklog.rows[0].totalActivity.map(activity => activity.name),
    datasets: [{
      label: 'Total Activity',
      data: data.data.AuthorWorklog.rows[0].totalActivity.map(activity => activity.value),
      backgroundColor: ['#EF6B6B', '#61CDBB', '#FAC76E', '#C2528B', '#0396A6', '#5F50A9', '#8F3519']
    }]
  };
  let dayWiseActivity = data.data.AuthorWorklog.rows[0].dayWiseActivity
  const dailyLabels = dayWiseActivity.map(activity => activity.date);
  const prOpenData = dayWiseActivity.map(activity => activity.items.children.find(a => a.label === 'PR Open')?.count || 0);
  const prMergedData = dayWiseActivity.map(activity => activity.items.children.find(a => a.label === 'PR Merged')?.count || 0);
  const commitsData = dayWiseActivity.map(activity => activity.items.children.find(a => a.label === 'Commits')?.count || 0);
  const prReviewedData = dayWiseActivity.map(activity => activity.items.children.find(a => a.label === 'PR Reviewed')?.count || 0);
  const prCommentsData = dayWiseActivity.map(activity => activity.items.children.find(a => a.label === 'PR Comments')?.count || 0);
  const incidentAlertsData = dayWiseActivity.map(activity => activity.items.children.find(a => a.label === 'Incident Alerts')?.count || 0);
  const incidentsResolvedData = dayWiseActivity.map(activity => activity.items.children.find(a => a.label === 'Incidents Resolved')?.count || 0);

  const dailyActivityData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'PR Open',
        data: prOpenData,
        backgroundColor: '#EF6B6B'
      },
      {
        label: 'PR Merged',
        data: prMergedData,
        backgroundColor: '#61CDBB'
      },
      {
        label: 'Commits',
        data: commitsData,
        backgroundColor: '#FAC76E'
      },
      {
        label: 'PR Reviewed',
        data: prReviewedData,
        backgroundColor: '#C2528B'
      },
      {
        label: 'PR Comments',
        data: prCommentsData,
        backgroundColor: '#0396A6'
      },
      {
        label: 'Incident Alerts',
        data: incidentAlertsData,
        backgroundColor: '#5F50A9'
      },
      {
        label: 'Incidents Resolved',
        data: incidentsResolvedData,
        backgroundColor: '#8F3519'
      }
    ]
  };

  return (
    <div className="App">
      <h2 className='title-text'>Activity Summary for rishi@devdynamics.ai</h2>
      
      <div className='chart-box'>
        <h3>Total Activity</h3>
        <Bar data={totalActivityData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </div>

      <div className='chart-box'>
        <h3>Day Wise Activity</h3>
        <Line data={dailyActivityData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
      </div>

      <div className='chart-box'>
        <h3>Activity Table</h3>
        <table className='rwd-table'>
          <thead>
            <tr>
              <th>Date</th>
              <th>PR Open</th>
              <th>PR Merged</th>
              <th>Commits</th>
              <th>PR Reviewed</th>
              <th>PR Comments</th>
              <th>Incident Alerts</th>
              <th>Incidents Resolved</th>
            </tr>
          </thead>
          <tbody>
            {dayWiseActivity.map((day, index) => (
              <tr key={index}>
                <td>{day.date}</td>
                {day.items.children.map((activity, i) => (
                  <td key={i}>{activity.count}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
