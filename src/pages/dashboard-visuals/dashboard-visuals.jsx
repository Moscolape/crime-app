import '../../components/my-dashboard/my-dashboard-component.styles.css';
import CrimeChart from '../../components/crime-bar-chart/crime-barchart.component';
import Loader from '../../components/loader/loading-component';
import PieChart from '../../components/crime-pie-chart/crime-piechart.component';
import CrimeMap from '../../components/crime-map/crime-map.component';

import { useCrimesContext } from '../../contexts/crime-data-context';
import Dashboard from '../../components/my-dashboard/my-dashboard-component';
import CrimeHistogram from '../../components/crime-histogram/crime-histogram-component';


const DashboardVisuals = () => {
  const { crimes, loading } = useCrimesContext();

  return (
    <Dashboard>
      <div>
          <p id='display'>Display of <b>Crimes</b> vs <b>No. of Occurrences</b></p>
          {loading ? <Loader /> : <CrimeChart />}
          {crimes && <PieChart className="pie" />}
          <CrimeMap />
          <CrimeHistogram/>
      </div>
    </Dashboard>
  )
}

export default DashboardVisuals;