import React from "react";
  
function UserInfoCard({ userData }) {
    return (
        <div className="datacontainer">
        <table>
            {
            userData !== undefined && userData.customers !== undefined && Object.keys(userData.customers).length > 0 ? userData.customers.map((item, i) => (
            <div>
                <tr key={i}>
                    <td>Id</td><td><div className="dataitem">{item.id}</div></td>
                </tr>
                <tr key={i}>
                    <td>Email</td><td><div className="dataitem">: {item.email}</div></td>
                </tr>
                <tr key={i}>
                    <td>Name</td><td><div className="dataitem">: {item.first_name} {item.last_name}</div></td>
                </tr>
                <tr key={i}>
                    <td>Phone</td><td><div className="dataitem">: {item.phone}</div></td>
                </tr>
            </div>
            
        )):<div></div>}
        </table>
        </div>
    );

}
  
export default UserInfoCard;