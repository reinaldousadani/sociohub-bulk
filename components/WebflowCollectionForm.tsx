import styles from './WebflowCollectionForm.module.css';
import { IWebflowField, WebflowFieldType } from "../types/webflow";
import { useForm, UseFormReturnType } from "@mantine/form";
import { Button, MultiSelect, Skeleton, Switch, TextInput } from "@mantine/core";
import React from "react";
import { DatePicker } from "@mantine/dates";

function ItemRefSetComponent({collectionId}: {collectionId: string | undefined}){
  
  const datas = [
    {value: "a", label: 'A'},
    {value: "b", label: "B"},
    {value: "c", label: "C"}
  ]

  if(!collectionId) return null

  return(
      <MultiSelect data={datas} label="Select" placeholder="Select some"  />
  )
}

function FormGenerator({
  field,
  form,
}: {
  field: IWebflowField;
  form: UseFormReturnType<{}, (values: {}) => {}>;
}) {
  switch (field.type) {
    case WebflowFieldType.bool:
      return (
        <Switch
          label={`${field.name}`}
          disabled={!field.editable}
          {...form.getInputProps(`${field.slug}`)}
        />
      );
    case WebflowFieldType.color:
      return (
        <TextInput
          label={`${field.name}`}
          placeholder={`Enter ${field.name}`}
          disabled={!field.editable}
          {...form.getInputProps(`${field.slug}`)}
        />
      );
    case WebflowFieldType.date:
      return (
        <DatePicker
          label={`${field.name}`}
          placeholder={`Enter ${field.name}`}
          disabled={!field.editable}
          {...form.getInputProps(`${field.slug}`)}
        />
      );
    case WebflowFieldType.extFileRef:
      return null;
    case WebflowFieldType.set:
      return null;
    case WebflowFieldType.imageRef:
      return (
        <TextInput
          label={`${field.name}`}
          placeholder={`Enter ${field.name}`}
          disabled
          {...form.getInputProps(`${field.slug}`)}
        />
      );
    case WebflowFieldType.itemRef:
      return null
    case WebflowFieldType.itemRefSet:
      return <ItemRefSetComponent collectionId={field.validations?.collectionId} />
    default:
      return null;
  }
}

export default function WebflowCollectionForm({
  fields,
}: {
  fields: IWebflowField[] | undefined;
}) {
  const generateInitialValues = () => {
    let initialValues = {};

    const generateFieldDefaultValue = (type: WebflowFieldType) => {
      switch (type) {
        case WebflowFieldType.bool:
          return false;
        case WebflowFieldType.color:
          return "";
        case WebflowFieldType.date:
          return "";
        case WebflowFieldType.extFileRef:
          return "";
        case WebflowFieldType.set:
          return [];
        case WebflowFieldType.imageRef:
          return "";
        case WebflowFieldType.itemRef:
          return "";
        case WebflowFieldType.itemRefSet:
          return [];
        case WebflowFieldType.link:
          return "";
        case WebflowFieldType.number:
          return 0;
        case WebflowFieldType.option:
          return "";
        case WebflowFieldType.plainText:
          return "";
        case WebflowFieldType.richText:
          return "";
        case WebflowFieldType.video:
          return "";
        case WebflowFieldType.user:
          return "";
      }
    };

    fields?.forEach((field) => {
      initialValues = {
        ...initialValues,
        [`${field.slug}`]: generateFieldDefaultValue(field.type),
      };
    });

    return { ...initialValues };
  };

  const generateValidationsObj = () => {
    let initialValidations = {};

    const generateValidationCallback = (field: IWebflowField) => {
      return (value: any) => {
        if (field.required) {
          if (!value) {
            return `${field.name} is required`;
          }
          return null;
        }
      };
    };

    fields?.forEach((field) => {
      initialValidations = {
        ...initialValidations,
        [`${field.slug}`]: generateValidationCallback(field),
      };
    });

    return { ...initialValidations };
  };

  const form = useForm({
    initialValues: generateInitialValues(),
    validate: generateValidationsObj(),
  });

  return (
    <form className={styles.form} onSubmit={form.onSubmit((values) => console.log("Values: ", values))}>
      {fields?.map((field) => (
        <FormGenerator field={field} key={field.id} form={form} />
      ))}
      <Button type="submit">Submit</Button>
    </form>
  );
}
