import { Table, TableContainer, TableHead, Paper, TableCell, TableBody, TableRow } from "@material-ui/core"
import { compose, map } from "ramda"

const tableWrap = (content) => (
    <TableContainer component={Paper} style={{maxHeight: 800}}>
        <Table stickyHeader={true} aria-label="sticky table">
            {content}
        </Table>
    </TableContainer>
);

const head = (row) => <TableHead>{row}</TableHead>
const body = (rows) => <TableBody>{rows}</TableBody>

const row = (cells) => <TableRow>{cells}</TableRow>
const cell = (val) => <TableCell align="right">{val}</TableCell>

export const table = (data) => {
    let categories = ["name", "vin", "address", "engineType", "fuel", "interior", "exterior"]

    const getCells = item => map(category => cell(item[category]), categories);
    const getRows = compose(row, getCells);

    return tableWrap([
        compose(head, row, map(cell))(categories),
        compose(body, map(getRows))(data)
    ]);
}