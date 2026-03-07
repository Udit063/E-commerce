import {
  Avatar,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductById, findProducts } from "../../store/Product/Action";

const ProductsTable = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const { products } = useSelector((store) => store);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  console.log("products", products);

  const handleDeleteClick = (productId, productTitle) => {
    setProductToDelete({ id: productId, title: productTitle });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (productToDelete) {
      //@ts-ignore
      dispatch(deleteProductById(productToDelete.id));
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  // Fetch a page of products whenever page changes
  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: page,
      pageSize: 10,
      stock: "",
    };

    //@ts-ignore
    dispatch(findProducts(data));
  }, [page, dispatch]);

  // Append newly loaded page to local rows (or reset when page = 0)
  useEffect(() => {
    const pageData = products.products?.content || [];
    const totalPages = products.products?.totalPages ?? 0;

    if (page === 0) {
      setRows(pageData);
    } else if (pageData.length) {
      setRows((prev) => [...prev, ...pageData]);
    }

    if (totalPages) {
      setHasMore(page + 1 < totalPages);
    } else if (!pageData.length) {
      setHasMore(false);
    }
  }, [products.products, page]);

  // After a delete, reset to the first page
  useEffect(() => {
    if (products.deletedProduct) {
      setPage(0);
      setRows([]);
      setHasMore(true);
    }
  }, [products.deletedProduct]);

  // Infinite scroll on the main admin scroll container: load next page near bottom
  useEffect(() => {
    const container = document.querySelector(".admin-main-scroll");
    if (!container) return;

    const handleScroll = () => {
      if (!hasMore || products.loading) return;

      const { scrollTop, clientHeight, scrollHeight } = container;
      const threshold = 100; // px from bottom

      if (scrollTop + clientHeight >= scrollHeight - threshold) {
        setPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasMore, products.loading]);

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item.imageUrl} alt="product"></Avatar>
                  </TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">{item.category.name}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleDeleteClick(item.id, item.title)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete Product
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete "{productToDelete?.title}"? This
            action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductsTable;
