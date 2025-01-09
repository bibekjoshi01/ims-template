import { useState } from 'react';
import PropTypes from 'prop-types';

// material-ui
import { DataGrid } from '@mui/x-data-grid';

// project-import
import { defaultPaginationDetail } from '../../utils/constants';

const AppTable = ({ rows, ...rest }) => {
  const [paginationDetail, setPaginationDetail] = useState(defaultPaginationDetail);

  const handlePaginationModal = (obj) => {
    setPaginationDetail(obj);
  };

  return (
    <div style={{ overflowX: 'auto' }}>
      <DataGrid
        rows={rows}
        {...rest}
        sx={{
          backgroundColor: '#fff'
        }}
        checkboxSelection
        editMode="row"
        paginationMode="server"
        paginationModel={paginationDetail}
        onPaginationModelChange={handlePaginationModal}
        pageSizeOptions={[2, 5, 10, 25]}
      />
    </div>
  );
};

AppTable.propTypes = {
  rows: PropTypes.array.isRequired
};

export default AppTable;
