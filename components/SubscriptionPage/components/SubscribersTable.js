import React from "react";
import {MDBContainer, MDBDataTable} from "mdbreact"
import PropTypes from "prop-types"

export default class SubscribersTable extends React.PureComponent {

  render() {
    const {students, title} = this.props;

    const data = {
      columns: [
        {
          label: 'Name',
          field: 'name',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Email Address',
          field: 'email',
          sort: 'asc',
          width: 100
        },
        {
          label: 'Subscription Expiry Date',
          field: 'expiryDate',
          sort: 'asc',
          width: 100
        }
      ],
      rows: students.map(
        ({expiryDate, ...attrs}) => {
          expiryDate = new Date(expiryDate);
          attrs.expiryDate = new Intl.DateTimeFormat("en-US", {
            weekday:"short",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour12: true,
            hour: "numeric",
            minute: "numeric"
          }).format(expiryDate)
          return attrs
        }
      )
    };
    return (
      <MDBContainer fluid className={"py-3"}>
        <h3 className={"mt-3"}>{title}</h3>
        <MDBDataTable
          paging={false}
          borderless
          responsiveMd
          hover
          noBottomColumns
          data={data}
        />
      </MDBContainer>
    )
  }
}

SubscribersTable.propTypes = {
  students: PropTypes.array.isRequired
}