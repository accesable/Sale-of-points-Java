import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur faucibus porta neque, ut luctus lacus pharetra vel. Sed pretium ipsum rhoncus magna placerat, sed posuere metus commodo. Praesent tempus, neque nec placerat posuere, libero orci blandit turpis, et elementum massa nulla in justo. Nullam placerat semper hendrerit. Aliquam eget euismod libero, at ullamcorper mauris. Cras ut lacus sit amet justo cursus volutpat sit amet vitae nisi. Sed aliquam massa ac est ultrices eleifend. Quisque hendrerit, nisl at laoreet luctus, nibh ipsum tristique purus, sed condimentum nulla dolor varius felis. Suspendisse felis augue, rutrum nec vestibulum vel, posuere et ex.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vivamus at risus varius, imperdiet massa non, ornare arcu. Vivamus lobortis leo at neque feugiat, vehicula lacinia libero varius. Ut odio nisl, gravida in augue eget, fermentum molestie velit. Proin eleifend tempus molestie. Suspendisse potenti. Sed tempor turpis quis lorem pellentesque, fringilla porta libero malesuada. Sed facilisis venenatis magna vitae molestie. Donec dapibus, massa sed laoreet finibus, dolor leo cursus nisi, sed lacinia leo dui et nulla. Ut congue vehicula consequat. Etiam erat arcu, tempor id odio vitae, euismod volutpat arcu.

Maecenas ac eros justo. Nam dignissim, purus ac accumsan bibendum, metus ex volutpat nunc, mattis tincidunt nunc augue eu mi. Aliquam sollicitudin a mi nec vehicula. Morbi ornare sed lorem a pretium. Quisque vitae ornare magna. Sed justo erat, rutrum vitae malesuada in, tincidunt id magna. Nunc fringilla risus nec nibh tempor, sed dictum eros pharetra. Aenean mollis at nibh a pretium. Curabitur at luctus quam. Proin ultrices dapibus orci et scelerisque. Aliquam enim quam, dictum in tortor quis, dictum semper lectus.

Donec quam orci, euismod in ex sed, consequat tincidunt urna. Fusce a nulla id est interdum pretium. Proin porttitor, magna quis fermentum pulvinar, tortor elit laoreet urna, suscipit placerat turpis est non augue. Etiam elit turpis, eleifend in diam vitae, auctor pellentesque odio. In hac habitasse platea dictumst. Morbi ut rhoncus tellus. In vel arcu sit amet quam pellentesque pretium. Ut sit amet sem ut tortor interdum malesuada. Maecenas eu lacus fermentum, faucibus sem vitae, porta tellus. Morbi efficitur eros ac viverra bibendum. Donec nec mauris vel diam scelerisque suscipit. Suspendisse sed euismod sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum nec sem ipsum. Aliquam congue sem ut molestie dapibus. Maecenas tellus mauris, viverra sed vehicula a, pulvinar eget purus.

Integer tincidunt in justo ut pharetra. Pellentesque tempus rhoncus odio eu viverra. Pellentesque tristique viverra metus, ac aliquet mi egestas ac. Integer auctor ligula at sem blandit aliquam. Maecenas pulvinar dictum justo, ac pharetra ex auctor et. Morbi maximus feugiat nunc, at semper lorem pulvinar ac. Quisque tempus mauris nec felis sodales, at luctus augue malesuada. In at neque mollis, interdum sem id, auctor urna. Etiam vestibulum elit vel metus elementum, vel laoreet libero auctor. Maecenas pellentesque elit et metus hendrerit, nec aliquam eros consectetur.
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}