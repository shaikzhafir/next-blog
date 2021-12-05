import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const PaginationComponent = (props) => {
  return (
    <div style={{display:"flex", justifyContent:"center"}}>
      <Stack spacing={2}>
        <Pagination 
        count={props.count}
        onChange={props.handlePageClick}
        page={props.page}
         />
      </Stack>
    </div>
  );
};

export default PaginationComponent;
