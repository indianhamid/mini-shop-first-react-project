import {
  Box,
  Button,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Toaster, toaster } from "../components/ui/toaster";
import { LuNotebookPen, LuTrash2 } from "react-icons/lu";
import { useColorModeValue } from "./ui/color-mode";

import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

export default function ProductCard({ product }) {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  // console.log("updatedProduct:", updatedProduct);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true); // باز کردن دیالوگ
  const handleClose = () => setIsOpen(false); // بستن دیالوگ

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);

    if (!success) {
      toaster.create({
        title: message,
        type: "error",
        duration: 6000,
      });
    } else {
      toaster.create({
        title: message,
        type: "success",
        duration: 6000,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    // console.log("id:", pid);
    // console.log("updatedProduct:", updatedProduct);
    const { success, message } = await updateProduct(pid, updatedProduct);
    handleClose();
    if (!success) {
      toaster.create({
        title: "Error",
        type: "error",
        description: message,
        duration: 6000,
      });
    } else {
      toaster.create({
        title: "Success",
        type: "success",
        description: "Product updated successfully",
        duration: 6000,
      });
    }
  };

  useEffect(() => setUpdatedProduct(product), [product]);
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        fit={"cover"}
        justifySelf={"center"}
      />
      <Box p={4}>
        <Heading as={"h3"} size="cover" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spaceX={2}>
          <IconButton
            aria-label="Edit Product"
            variant="outline"
            size={"md"}
            colorPalette="green"
            onClick={handleOpen}
          >
            <LuNotebookPen />
          </IconButton>

          <IconButton
            aria-label="Delete Product"
            variant="outline"
            size={"md"}
            colorPalette="red"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <LuTrash2 />
          </IconButton>
        </HStack>
      </Box>

      <DialogRoot open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
        <Portal>
          <DialogContent
            pos={"fixed"}
            top={"25%"}
            left={"36%"}
            zIndex={9999}
            boxShadow={"lg"}
          >
            <DialogHeader>
              <DialogTitle>Dialog Title</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <VStack spaceX={4} spaceY={4}>
                <Input
                  placeholder="Product Name"
                  name="name"
                  value={updatedProduct.name}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updateProduct,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updateProduct,
                      price: e.target.value,
                    })
                  }
                />
                <Input
                  placeholder="Image URL"
                  name="image"
                  value={updatedProduct.image}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updateProduct,
                      image: e.target.value,
                    })
                  }
                />
              </VStack>
            </DialogBody>
            <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={handleClose}>
                  Cancel
                </Button>
              </DialogActionTrigger>
              <Button
                onClick={() => handleUpdateProduct(product._id, updatedProduct)}
              >
                Update
              </Button>
            </DialogFooter>
            <DialogCloseTrigger onClick={handleClose} />
          </DialogContent>
        </Portal>
      </DialogRoot>

      <Toaster />
    </Box>
  );
}
