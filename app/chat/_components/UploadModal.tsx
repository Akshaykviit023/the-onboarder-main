'use client';

import { useState, useEffect } from 'react';

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button";
import { Upload, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input"


const UploadModal = () => {
    const [file, setFile] = useState<File | null>(null);
    const [collectionName, setCollectionName] = useState('');

    // Load the collection name from localStorage when the component mounts
    useEffect(() => {
        const storedCollectionName = localStorage.getItem('collectionName');
        if (storedCollectionName) {
            setCollectionName(storedCollectionName);
        }
    }, []);

    // Save the collection name to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('collectionName', collectionName);
    }, [collectionName]);

    const uploadFile = async () => {
        if (!file) {
          alert('Please select a file to upload');
          return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('collection_name', collectionName);
    
        try {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const data = await response.json().catch(() => null);
          if (data) {
            console.log(data);
          } else {
            console.log('No data returned');
          }
        } catch (error) {
          console.error('Failed to upload file:', error);
        }
      };



    return (
        <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost"><Upload /></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Document Upload</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
            <Input id="documents" type="file" onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}
        />

        <Input type="text" placeholder="Collection Name" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}  />
            </div>
            <Button type="submit" size="sm" className="px-3" onClick={uploadFile}>
              <UploadIcon />
            </Button>
          </div>

          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default UploadModal