import React from "react";
import {Line} from "react-chartjs-2";
import {MDBAnimation, MDBContainer} from "mdbreact";

class RevenueChart extends React.Component {
  isMobileDevice = () => {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  }

  render() {
    const {transactions} = this.props;

    if (!transactions) return null

    const dataLine = {
      labels: transactions.map(({time}) => new Date(time)),
      datasets: [
        {
          label: "Income Generated",
          fill: true,
          //lineTension: 0.5,
          backgroundColor: "rgba(0,70,150,0.3)",
          borderColor: "rgb(0,75,150)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(0,70,150,0.7)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: transactions.map(({time, amount}) => ({x: new Date(time), y: amount})),
        }
      ]
    }
    return (
      <MDBAnimation type={"fadeIn"}>
        <MDBContainer fluid className={"pb-4"}>
          <h2 className={"ml-4 mt-4"}>Income</h2>
          <Line data={dataLine}
                options={{
                  responsive: true,
                  scales: {
                    xAxes: [{
                      type: 'time',
                      time: {
                        unit: 'day'
                      },
                      distribution: "series",
                      display: !this.isMobileDevice()
                    }]
                  }
                }}/>
        </MDBContainer>
      </MDBAnimation>
    );
  }
}

export default RevenueChart
