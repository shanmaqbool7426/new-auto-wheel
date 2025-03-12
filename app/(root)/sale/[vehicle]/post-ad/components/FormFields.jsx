import { ActionIcon, Box, Button, Checkbox, Grid, Group, Image, Input, NumberInput, Select, SimpleGrid, Text, Textarea, TextInput, Title } from "@mantine/core"
import { getFeaturesByVehicle } from "@/app/(root)/sale/[vehicle]/post-ad/components/useFeatureData";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { MdArrowDropDown } from "react-icons/md";

/**
 * FormFieldSelect Component
 * Renders a select input with label and placeholder
 */
export const FormFieldSelect = ({ label, defaultValue, placeholder, data, value, valueData, nothingFoundMessage, ...props }) => (
    <>
        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
            <Input.Label required size="md">
                {label}
            </Input.Label>
        </Box>
        {console.log("............,,..",valueData)}
        <Box className="col-md-7">
            <Select
                required
                size="md"
                {...props} 
                searchable
                rightSection={<MdArrowDropDown size={24}  color="#E90808" />}
                rightSectionWidth={40}
                value={valueData}
                // defaultValue='Petrol'
                nothingFoundMessage={nothingFoundMessage || "Nothing found..."}
                placeholder={placeholder}
                data={data || []}
            />
        </Box>
    </>
)

/**
 * FormFieldInput Component
 * Renders an input field with label and placeholder
 */
export const FormFieldInput = ({ label, placeholder, ...props }) => (
    <>
        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
            <Input.Label required size="md" tt="capitalize">{label}</Input.Label>
        </Box>
        <Box className="col-md-7">
            <TextInput
                {...props} // Move spread props first
                required
                size="md"
                rightSection={<MdArrowDropDown size={24} color="#E90808"  />}
                rightSectionWidth={40}
                placeholder={placeholder} // Place specific props after spread
            />
        </Box>
    </>
)

/**
 * FormFieldNumberInput Component
 * Renders a number input field with label and placeholder
 */
export const FormFieldNumberInput = ({ label, placeholder, ...props }) => (
    <>
        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
            <Input.Label required size="md" tt="capitalize">{label}</Input.Label>
        </Box>
        <Box className="col-md-7">
            <NumberInput
                required
                size="md"
                placeholder={placeholder}
                {...props} />
        </Box>
    </>
)

/**
 * FormFieldTextarea Component
 * Renders a textarea field with label and placeholder
 */
export const FormFieldTextarea = ({ label, placeholder, reset, remainingCharacters, ...props }) => (
    <>
        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
            <Input.Label required size="md" tt="capitalize">{label}</Input.Label>
        </Box>
        <Box className="col-md-10">
            <Textarea
                required
                size="md"
                autosize
                minRows={5}
                maxRows={6}
                fs={8}
                placeholder={placeholder}
                {...props} />
            <Group gap={0}>
                <Text size="sm" c="dimmed" ml="auto">
                    Remaining Characters {remainingCharacters}
                </Text>

                <Button
                    variant="transparent"
                    pr="0"
                    size="sm"
                    className="text-primary"
                    onClick={reset}
                >
                    Reset
                </Button>
            </Group>
        </Box>
    </>
)

/**
 * FormFieldImageUpload Component
 * Renders an image upload field with label and placeholder
 */
export const FormFieldImageUpload = ({ label, images, setImages, form }) => {
    const [isUploading, setIsUploading] = useState(false);

    const previews = images.map((file, index) => {
        const imageUrl = typeof file === 'string' ? file : URL.createObjectURL(file);
        return (
            <Box className="uploaded-image-wrapper" pos="relative" key={index} style={{
               border: "3px solid #E90808",
            }}>
                <ActionIcon
                    variant="filled"
                    color="red"
                    pos="absolute"
                    top={5}
                    right={5}
                    radius="xl"
                    style={{
                        backgroundColor: "#E90808",
                        color: "white",
                        border: "3px solid #E90808",
                    }}
                    size="sm"
                    disabled={isUploading}
                    onClick={() => {
                        const updatedImages = [...images];
                        updatedImages.splice(index, 1);
                        setImages(updatedImages);
                        form.setFieldValue('images', updatedImages);
                    }}
                >
                    ×
                </ActionIcon>
                <Image
                    style={{
                        border: "3px solid #E90808"
                    }}
                    h={{ base: 140, sm: 140 }}
                    src={imageUrl}
                    // Only revoke URL if it's a File object
                    onLoad={() => {
                        if (typeof file !== 'string') {
                            URL.revokeObjectURL(imageUrl);
                        }
                    }}
                    radius="md"
                />
            </Box>
        );
    });


    const handleFileDrop = async (files) => {
        setIsUploading(true);
        setImages(prevImages => [...prevImages, ...files]);
        try {
            const formData = new FormData();
            files.forEach((file) => {
                formData.append("images", file, file.name);
            });

            const response = await fetch(API_ENDPOINTS.IMAGE_UPLOAD, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            const uploadedImageUrls = data.data;
            form.setFieldValue('images', [...form.values.images, ...uploadedImageUrls]);
            showNotification({
                title: "Images uploaded successfully",
                message: "The images have been successfully uploaded.",
                color: "green",
              });
        } catch (error) {
            console.error(error);
            showNotification({
                title: "Images upload failed",
                message: "The images could not be uploaded.",
                color: "red",
              });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <>
            <Box className="col-md-12" >
                <Title order={4} mb="lg">
                    {label}
                </Title>
                <Dropzone
                    accept={IMAGE_MIME_TYPE}
                    onDrop={handleFileDrop}
                    disabled={isUploading}
                    loading={isUploading}
                    p={0}
                    error={form.errors.images}
                >
                    <Image
                        style={{
                            border: "1px dashed #E90808",
                            borderRadius: "5px",
                        }}
                        src="/upload.png"
                        className="img-fluid w-100 h-100"
                        alt="Upload Image"
                    />
                </Dropzone>
                {form.errors.images && (
                    <Text size="sm" c="red">
                        {form.errors.images}*
                    </Text>
                )}

                <SimpleGrid
                    cols={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
                    mt={previews.length > 0 ? "md" : 0}
                >
                    {previews}
                </SimpleGrid>
            </Box>
        </>
    )
}

/**
 * FormFieldBodyType Component
 * Renders a body type field with label and body types
 */
export const FormFieldBodyType = ({ label, bodies, form }) => (
    <>
        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
            {console.log("form.values.body",form.values.body)}
            <Input.Label required size="md" tt="capitalize">{label}</Input.Label>
        </Box>
        <Box className="col-md-7">
            <Grid mb="lg">
                {bodies?.map((bodyType) => (
                    <Grid.Col
                        span={4}
                        ta="center"
                        key={bodyType.title}
                    >
                        <div className="single-brand-item selected-brand-item text-center">
                            <label
                                className={`text-decoration-none ${
                                    form.values.body === bodyType._id ||
                                    form.values.body === bodyType.title.toLowerCase()
                                        ? "checked"
                                        : ""
                                }`}
                            >
                                <input
                                    type="radio"
                                    name="bodyType"
                                    value={bodyType._id}
                                    checked={
                                        form.values.body === bodyType._id ||
                                        form.values.body === bodyType.title.toLowerCase()
                                    }
                                    onChange={() => {
                                        form.setFieldValue('body', bodyType._id);
                                    }}
                                />
                                <Image
                                    width={80}
                                    height={60}
                                    src={bodyType.bodyImage}
                                    className="mx-auto text-center"
                                    alt={`${bodyType.name} body type`}
                                />
                                <h6 className="mb-0 text-dark">
                                    {bodyType.title}
                                </h6>
                            </label>
                        </div>
                    </Grid.Col>
                ))}
            </Grid>
            {form.errors.body && (
                <Text size="sm" c="red">
                    {form.errors.body}*
                </Text>
            )}
        </Box>
    </>
)

/**
 * FormFieldFeature Component
 * Renders a feature field with label and features
 */
export const FormFieldFeature = ({ label, form, vehicleType }) => {
    const { featuredListsOne, featuredListsTwo, featuredListsThree } = getFeaturesByVehicle(vehicleType);
    const handleFeatureChange = (feature) => {
        const features = form.getValues().features;
        form.setFieldValue('features', features.includes(feature) ? features.filter(f => f !== feature) : [...features, feature]);
    };
    return (
        <>
            <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                <Input.Label required size="md" tt="capitalize">{label}</Input.Label>
            </Box>
            <Box className="col-md-7">
                <Box className="row">
                    <Box className="col-md-4">
                        {featuredListsOne.map((item, index) => (
                            <>
                                <Checkbox
                                    key={index}
                                    color="#E90808"
                                    label={item.name}
                                    mb="sm"
                                    size="sm"
                                    checked={form.values.features.includes(
                                        item.name
                                    )}
                                    onChange={() =>
                                        handleFeatureChange(item.name)
                                    }
                                />
                            </>
                        ))}
                    </Box>
                    <Box className="col-md-4">
                        {featuredListsTwo.map((item, index) => (
                            <>
                                <Checkbox
                                    key={index}
                                    color="#E90808"
                                    label={item.name}
                                    mb="sm"
                                    size="sm"
                                    checked={form.values.features.includes(
                                        item.name
                                    )}
                                    onChange={() =>
                                        handleFeatureChange(item.name)
                                    }
                                />
                            </>
                        ))}
                    </Box>
                    <Box className="col-md-4">
                        {featuredListsThree.map((item, index) => (
                            <>
                                <Checkbox
                                    key={index}
                                    color="#E90808"
                                    label={item.name}
                                    mb="sm"
                                    size="sm"
                                    checked={form.values.features.includes(
                                        item.name
                                    )}
                                    onChange={() =>
                                        handleFeatureChange(item.name)
                                    }
                                />
                            </>
                        ))}
                    </Box>
                </Box>
                <Box className="col-12 text-start">
                    {form.errors.features && (
                        <Text size="sm" c="red">
                            {form.errors.features}*
                        </Text>
                    )}
                </Box>
            </Box>
        </>
    )
}
