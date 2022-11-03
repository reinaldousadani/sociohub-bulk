import { useForm, UseFormReturnType } from "@mantine/form";
import { randomId } from "@mantine/hooks";
import {
  TextInput,
  Button,
  Divider,
  Center,
  Image,
  MultiSelect,
  Skeleton,
} from "@mantine/core";
import styles from "./SellerForm.module.css";
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import dynamic from "next/dynamic";
import axios from "axios";
import useSWR from "swr";
import { IWebflowCollectionItemCategories } from "../types/webflow";
import { MutableRefObject, useRef } from "react";
import _ from "lodash-es";

const DynamicRTE = dynamic(() => import("@mantine/rte"), {
  ssr: false,
});

function CategoriesForm({
  label,
  placeholder,
  form,
  formField,
}: {
  label: string;
  placeholder: string;
  form: UseFormReturnType<any, any>;
  formField: string;
}) {
  const categoriesFetcher = (url: string) =>
    axios.get(url).then((res) => res.data);

  const { data, error } = useSWR("/api/categories", categoriesFetcher);

  if (!data && !error)
    return (
      <div>
        <p className={styles[`mantine-form-label`]}>{label}</p>
        <Skeleton>
          <MultiSelect data={[]} />
        </Skeleton>
      </div>
    );

  if (error)
    return (
      <Center>
        <p>Something goes wrong..</p>
      </Center>
    );

  return (
    <MultiSelect
      data={data.items.map((elem: IWebflowCollectionItemCategories) => {
        return {
          label: elem.name,
          value: elem.slug,
        };
      })}
      label={label}
      placeholder={placeholder}
      {...form.getInputProps(formField)}
    />
  );
}

export default function SellerForm() {
  const nameRef = useRef();
  const imageRef = useRef();

  const scrollToRef = (ref: MutableRefObject<HTMLElement>) => {
    ref.current.scrollIntoView();
  };

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
      categories: [],
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
          categories: [],
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
          ref={nameRef}
          required
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
                  maxWidth: "300px",
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
          required
          disabled
          {...sellerForm.getInputProps(`sellers.${idx}.image`)}
          ref={imageRef}
        />

        <div>
          <p className={styles[`mantine-form-label`]}>
            {`Seller's Description`}
          </p>
          <DynamicRTE
            controls={[["image", "orderedList", "unorderedList"]]}
            {...sellerForm.getInputProps(`sellers.${idx}.sellerDescription`)}
          />
        </div>

        <TextInput
          label="Location"
          placeholder="Enter Seller's Location"
          {...sellerForm.getInputProps(`sellers.${idx}.location`)}
        />

        <CategoriesForm
          label="Categories"
          placeholder="Enter Seller's Categories"
          form={sellerForm}
          formField={`sellers.${idx}.categories`}
        />

        <TextInput
          label="Main Link"
          placeholder="Enter Seller's Main Link"
          {...sellerForm.getInputProps(`sellers.${idx}.mainLink`)}
        />

        <TextInput
          label="Instagram Link"
          placeholder="Enter Seller's Instagram Link"
          {...sellerForm.getInputProps(`sellers.${idx}.instagramLink`)}
        />

        <TextInput
          label="Shopee Link"
          placeholder="Enter Seller's Shopee Link"
          {...sellerForm.getInputProps(`sellers.${idx}.shopeeLink`)}
        />

        <TextInput
          label="Tokopedia Link"
          placeholder="Enter Seller's Tokopedia Link"
          {...sellerForm.getInputProps(`sellers.${idx}.tokopediaLink`)}
        />

        <TextInput
          label="Other Link"
          placeholder="Enter Seller's Other Link"
          {...sellerForm.getInputProps(`sellers.${idx}.otherLink`)}
        />

        {sellerForm.values.sellers.length !== 1 && (
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              deleteSellerByIndex(e, idx)
            }
            color={"red"}
          >
            Remove this seller
          </Button>
        )}

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
