'use client';

import { useState, useEffect } from 'react';
import { firestore } from '../firebase'; // Adjust the path if needed
import { Box, Modal, Stack, TextField, Button, Typography } from '@mui/material';
import { collection, getDocs, query, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setInventory(inventoryList);
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updateInventory();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  }

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      gap={3}
      sx={{
        backgroundImage: 'url(/background.jpg)', // Path to your background image
        backgroundSize: 'cover', // Cover the entire component
        backgroundPosition: 'center', // Center the image
      }}
    >
      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute" 
          top="50%"
          left="50%"
          width={400}
          bgcolor="rgba(255, 255, 255, 0.9)" // Slightly transparent white for a soft look
          borderRadius="12px" // Slightly rounded corners
          boxShadow={3}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6" color="#333">Add Item</Typography>
          <TextField
            variant="outlined"
            fullWidth
            label="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => {
              addItem(itemName);
              setItemName('');
              handleClose();
            }}
            sx={{
              backgroundColor: '#8B4513', // SaddleBrown color for a woodish look
              color: '#FFFFFF', // White text for contrast
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#6F4F28', // Darker brown on hover
              },
            }}
          >
            Add
          </Button>
        </Box>
      </Modal>

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          backgroundColor: '#8B4513', // SaddleBrown color for a woodish look
          color: '#FFFFFF', // White text for contrast
          textTransform: 'none',
          borderRadius: '8px',
          '&:hover': {
            backgroundColor: '#6F4F28', // Darker brown on hover
          },
        }}
      >
        Add to Collection
      </Button>

      <Box
        width="800px"
        bgcolor="#FFE4E1" // Peach color for boxes
        p={2}
        borderRadius="12px"
        mb={2}
        boxShadow={1}
      >
        <Typography variant="h4" color="#333" align="center">Exquisite Pantry</Typography>
      </Box>

      <Stack width="800px" spacing={2} overflow="auto">
        {inventory.map(({ name, quantity }) => (
          <Box
            key={name}
            width="100%"
            minHeight="150px"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bgcolor="#FFE4E1" // Peach color for boxes
            borderRadius="12px"
            boxShadow={2}
            padding={2}
            sx={{
              '&:hover': {
                boxShadow: 4,
              },
            }}
          >
            <Typography variant="h5" color="#333" textAlign="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography variant="h5" color="#333" textAlign="center">
              {quantity}
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                onClick={() => addItem(name)}
                sx={{
                  backgroundColor: '#4CAF50', // Green color for Increment
                  color: '#FFFFFF', // White text for contrast
                  textTransform: 'none',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#388E3C', // Darker green on hover
                  },
                }}
              >
                Increment
              </Button>
              <Button
                variant="contained"
                onClick={() => removeItem(name)}
                sx={{
                  backgroundColor: '#F44336', // Red color for Decrement
                  color: '#FFFFFF', // White text for contrast
                  textTransform: 'none',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#D32F2F', // Darker red on hover
                  },
                }}
              >
                Decrement
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
