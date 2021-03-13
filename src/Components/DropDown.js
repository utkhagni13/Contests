import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";

function DropdownPage() {
  const [sortBy, setSortBy] = useState("Sort By");

  return (
    <Dropdown className="dropdown1 mt-1">
      <Dropdown.Toggle variant="inherit">
        <span className="toggleDropDown">{sortBy}</span>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setSortBy("Category");
              //   let newItemList = itemList.sort((a, b) =>
              //     a.category > b.category ? -1 : 1
              //   );
              //   setItemList([...newItemList]);
            }}
          >
            Category
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setSortBy("Cost Ascending");
              //   let newItemList = itemList.sort((a, b) =>
              //     a.cost > b.cost ? 1 : -1
              //   );
              //   setItemList([...newItemList]);
            }}
          >
            Cost Ascending
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Toggle>
    </Dropdown>
  );
}

export default DropdownPage;
