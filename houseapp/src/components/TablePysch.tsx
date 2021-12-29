// import { createAnOrderedListOfPlayerScores } from '../utilities/utilityFunctions';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const RoundResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  //   gap: 15px;
  width: 100%;
  min-width: 300px;
  align-content: center;
  align-items: center;
  margin-bottom: 25px;
`;

const DataRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow: none;
  padding: 20px;
  width: 80%;
  font-size: 1.2em;
  align-items: center;

  @media (max-width: 600px) {
    width: 90%;
    font-size: 1em;
    padding: 10px;
  }
`;

const DataCellContainer = styled.div`
  flex: 1;
  text-align: center;

  min-width: 100px;
`;

export interface ResultsTableOrchestratorProps {
  tableHeaders: { id: string; headerText: string }[];
  tableData: { id: string; data: [{ id: string; value: string }] }[];
}

/**
 * Data structure!
 *
 * TableHeaders: [{id: string, headerText: string}, ...]
 * TableData: [{ id: string; data: [{ id: string; value: string }] }]
 *
 */
const ResultsTableOrchestrator: React.SFC<ResultsTableOrchestratorProps> = ({
  tableHeaders,
  tableData,
}) => {
  return (
    <div>
      <RoundResultsContainer>
        <DataRowContainer>
          {tableHeaders.map((header) => {
            <DataCellContainer key={header.id}>
              {console.log(header.headerText)}
              <h2 style={{ color: 'white' }}>{header.headerText}</h2>
            </DataCellContainer>;
          })}
        </DataRowContainer>

        {tableData.map((tableRow: any, index: number) => {
          return (
            <DataRowContainer
              key={tableRow.id}
              style={{
                backgroundColor: index % 2 == 0 ? '#0c2a4a' : '#230e4a',
              }}
              onClick={tableRow.clicked}
            >
              {tableRow.data.map((data: any) => {
                return (
                  <DataCellContainer key={data.id}>
                    {data.value}
                  </DataCellContainer>
                );
              })}
            </DataRowContainer>
          );
        })}
      </RoundResultsContainer>
    </div>
  );
};

export default ResultsTableOrchestrator;
