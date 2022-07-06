import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";

const ItemList = (props) => {
  if (!props.items && !props.search) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.items.length === 0 && !props.search) {
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  if (props.items.length === 0 && props.search) {
    return (
      <div id="empty" className="py-4">
        No items found for <strong>{props.search}</strong>
      </div>
    );
  }
  return (
    <div className="container py-2">
      <div className="row">
        {props.items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
        search={props.search}
      />
    </div>
  );
};

export default ItemList;
