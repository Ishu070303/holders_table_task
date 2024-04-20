import { Fragment } from "react";
import { Table, HoldingTableData } from './components';

const App = () => {
return(
  <Fragment>
    <Table title="Real Estate">
      <HoldingTableData />
    </Table>
    <Table title="Fund">
      <HoldingTableData />
    </Table>
  </Fragment>
)
};

export default App;