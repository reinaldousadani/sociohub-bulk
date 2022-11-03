import { useForm } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import { TextInput, Button, Divider, Center, Image } from "@mantine/core";
import styles from "./SellerForm.module.css";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";

const sellerCollectionId = "6258313485561f0739b03126";

export default function SellerForm() {
  const handleAddMoreSeller = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    sellerForm.insertListItem("sellers", {
      name: "",
      slug: "",
      collectionId: "",
      itemId: "",
      createdOn: "",
      updatedOn: "",
      publishedOn: "",
      image: "",
      imageDataUrl: "",
      sellerDescription: "",
      location: "",
      categories: "",
      mainLink: "",
      instagramLink: "",
      facebookLink: "",
      shopeeLink: "",
      tokopediaLink: "",
      otherLink: "",
      key: randomId(),
    });
  };

  const deleteSellerByIndex = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();

    sellerForm.removeListItem("sellers", idx);
  };

  const generateLocalImageURL = (file: FileWithPath) => {
    return URL.createObjectURL(file);
  };

  const sellerForm = useForm({
    initialValues: {
      sellers: [
        {
          name: "",
          slug: "",
          collectionId: "",
          itemId: "",
          createdOn: "",
          updatedOn: "",
          publishedOn: "",
          image: "",
          imageDataUrl: "",
          sellerDescription: "",
          location: "",
          categories: "",
          mainLink: "",
          instagramLink: "",
          facebookLink: "",
          shopeeLink: "",
          tokopediaLink: "",
          otherLink: "",
          key: randomId(),
        },
      ],
    },
  });

  const fields = sellerForm.values.sellers.map((seller, idx) => {
    return (
      <div key={seller.key} className={styles.form}>
        <TextInput
          label="Seller's Name"
          placeholder="Enter Seller's Name"
          {...sellerForm.getInputProps(`sellers.${idx}.name`)}
        />
        <TextInput
          label="Slug"
          placeholder="This field will be automatically filled"
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.slug`)}
        />
        <TextInput
          label="Collection ID"
          placeholder="This field will be automatically filled"
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.collectionId`)}
        />
        <TextInput
          label="Item ID"
          placeholder="This field will be automatically filled"
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.itemId`)}
        />
        <TextInput
          label="Created On"
          placeholder="This field will be automatically filled"
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.createdOn`)}
        />
        <TextInput
          label="Updated On"
          placeholder="This field will be automatically filled"
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.updatedOn`)}
        />
        <TextInput
          label="Published On"
          placeholder="This field will be automatically filled"
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.publishedOn`)}
        />

        <div
          style={{
            marginTop: "0.5rem",
          }}
        />
        <Dropzone
          onDrop={(files) => {
            if (files.length > 1) {
              showNotification({
                title: "Limit Exceeded!",
                message: "Only one image is allowed for Seller's Image",
                color: "red",
              });
              return;
            }
            const fileDataURL = generateLocalImageURL(files[0]);
            sellerForm.setFieldValue(
              `sellers.${idx}.imageDataUrl`,
              fileDataURL
            );
          }}
          onReject={(rejections) => {
            rejections.forEach((rejection) => {
              rejection.errors.forEach((error) => {
                showNotification({
                  title: "File Rejected!",
                  message: `${error.message}`,
                  color: "red",
                });
              });
            });
          }}
          maxSize={3 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Center>
            {sellerForm.values.sellers[idx].imageDataUrl ? (
              <Image
                src={sellerForm.values.sellers[idx].imageDataUrl}
                imageProps={{
                  onLoad: () =>
                    URL.revokeObjectURL(
                      sellerForm.values.sellers[idx].imageDataUrl
                    ),
                }}
                alt="Uploaded Image"
                style={{
                  maxWidth: '300px'
                }}
              />
            ) : (
              <p>{`Drag and drop or click to select Seller's Image`}</p>
            )}
          </Center>
        </Dropzone>
        <TextInput
          label="Image"
          placeholder="Upload your image above to fill this field"
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.image`)}
        />

        <Button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            deleteSellerByIndex(e, idx)
          }
          color={"red"}
        >
          Remove this seller
        </Button>

        <Divider />
      </div>
    );
  });

  return (
    <form onSubmit={sellerForm.onSubmit((values) => console.log(values))}>
      {fields}
      <div className={styles[`button-wrapper`]}>
        <Button variant="outline" onClick={handleAddMoreSeller}>
          Add more seller +
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
