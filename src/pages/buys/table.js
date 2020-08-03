import React from "react";
import { Table, Button } from "react-bootstrap";

export default ({ buys, deleteBuys, editBuys }) => {
    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Cost Dollars</th>
                        <th>Total Weight Kg</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {buys.map((buy) => {
                        const {
                            _id,
                            name,
                            cost_dollars,
                            total_weight_kg,
                        } = buy;
                        return (
                            <tr key={_id}>
                                <td>{name}</td>
                                <td>{cost_dollars.toFixed(2)}</td>
                                <td>{total_weight_kg.toFixed(2)} Kg</td>
                                <td>
                                    <Button
                                        variant="success"
                                        className="ml-3 mr-3"
                                        onClick={() => {
                                            editBuys(_id);
                                        }}
                                    >
                                        Edit
                  </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => {
                                            deleteBuys(_id);
                                        }}
                                    >
                                        Delete
                  </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};
