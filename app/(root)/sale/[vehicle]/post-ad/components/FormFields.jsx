import { ActionIcon, Box, Button, Checkbox, Grid, Group, Image, Input, NumberInput, Select, SimpleGrid, Text, Textarea, TextInput, Title, Accordion } from "@mantine/core"
import { getFeaturesByVehicle } from "@/app/(root)/sale/[vehicle]/post-ad/components/useFeatureData";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { useState } from "react";
import { showNotification } from "@mantine/notifications";
import { MdArrowDropDown, MdCheckCircle } from "react-icons/md";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * FormFieldSelect Component
 * Renders a select input with label and placeholder
 */
export const FormFieldSelect = ({ label, placeholder, data, value, onChange, error, ...props }) => (
    <>
        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
            <Input.Label required size="md">
                {label}
            </Input.Label>
        </Box>
        <Box className="col-md-7">
            <Select
                required
                size="md"
                searchable
                rightSection={<MdArrowDropDown size={24} color="#E90808" />}
                rightSectionWidth={40}
                value={value}
                onChange={onChange}
                error={error}
                placeholder={placeholder || `Select ${label}`}
                data={data || []}
                nothingFoundMessage="No options found..."
                {...props}
            />
            {error && (
                <Text size="sm" c="red" mt={4}>
                    {error}
                </Text>
            )}
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
                size="md"
                rightSectionWidth={40}
                {...props} // Spread props after specific props
                placeholder={placeholder} // Ensure this is set after spreading props
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
 * Renders an image upload field with drag-and-drop, rotation, and reordering capabilities
 */
export const FormFieldImageUpload = ({ label, images, setImages, form }) => {
    const [isUploading, setIsUploading] = useState(false);
    const [rotations, setRotations] = useState({});
    // Configure DND sensors
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // 5px movement required before drag starts
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Handle image reordering
    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = parseInt(active.id);
            const newIndex = parseInt(over.id);

            const newImages = arrayMove(images, oldIndex, newIndex);
            setImages(newImages);
            form.setFieldValue('images', newImages);
        }
    };

    // Handle image rotation
    const handleRotate = (index) => {
        setRotations(prev => ({
            ...prev,
            [index]: ((prev[index] || 0) + 90) % 360
        }));
    };

    // Sortable image component
    const SortableImage = ({ file, index }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
        } = useSortable({ id: index.toString() });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        const imageUrl = typeof file === 'string' ? file : URL.createObjectURL(file);

        return (
            <Box
                ref={setNodeRef}
                style={style}
                className="uploaded-image-wrapper"
                pos="relative"
            >
                <Group spacing={5} pos="absolute" top={5} right={5} style={{ zIndex: 2 }}>
                    {/* <ActionIcon
                        variant="filled"
                        color="blue"
                        radius="xl"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleRotate(index);
                        }}
                        style={{
                            backgroundColor: "#2196F3",
                            color: "white",
                        }}
                    >
                        ↻
                    </ActionIcon> */}
                    <ActionIcon
                        variant="filled"
                        color="red"
                        radius="xl"
                        size="sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            const updatedImages = [...images];
                            updatedImages.splice(index, 1);
                            setImages(updatedImages);
                            form.setFieldValue('images', updatedImages);
                            // Clean up rotations
                            const newRotations = { ...rotations };
                            delete newRotations[index];
                            setRotations(newRotations);
                        }}
                        style={{
                            backgroundColor: "#E90808",
                            color: "white",
                        }}
                    >
                        ×
                    </ActionIcon>
                </Group>
                <div {...attributes} {...listeners} style={{ cursor: 'move' }}>
                    <Image
                        style={{
                            transform: `rotate(${rotations[index] || 0}deg)`,
                            transition: 'transform 0.3s ease',
                            border: index === 0 ? "3px solid #4CAF50" : "3px solid #E90808",
                        }}
                        h={{ base: 140, sm: 140 }}
                        src={imageUrl}
                        onLoad={() => {
                            if (typeof file !== 'string') {
                                URL.revokeObjectURL(imageUrl);
                            }
                        }}
                        radius="md"
                    />
                </div>
                {index === 0 && (
                    <Text
                        size="xs"
                        ta="center"
                        fw={500}
                        style={{
                            position: 'absolute',
                            bottom: 5,
                            left: 0,
                            right: 0,
                            backgroundColor: 'rgba(76, 175, 80, 0.8)',
                            color: 'white',
                            padding: '2px',
                        }}
                    >
                        Main Photo
                    </Text>
                )}
            </Box>
        );
    };
    // Handle file drop
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
            setImages([...form.values.images, ...uploadedImageUrls]);

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
        <Box className="col-md-12">
            <Title order={4} mb="lg">{label}</Title>
            <Dropzone
                accept={IMAGE_MIME_TYPE}
                onDrop={handleFileDrop}
                disabled={isUploading}
                loading={isUploading}
                p={0}
                error={form.errors.images}
                onDragOver={(e) => {
                    if (e.target.closest('.uploaded-image-wrapper')) {
                        e.preventDefault();
                    }
                }}
            >
                <Box
                    style={{
                        cursor: "pointer",
                        border: '1px dashed #E90808',
                        borderRadius: '10px',
                        textAlign: 'center',
                    }}
                    px={'40px'}
                    py={'40px'}
                >
                    <div className="upload-placeholder">
                        <div className="d-flex align-items-center gap-4 justify-content-center">
                            <Image src="/dropzone_placeholder.png" alt="upload-image" h={'59px'} w={'59px'} quality={100} />
                            <div>
                                <Button
                                    variant="filled"
                                    size="md"
                                    fullWidth
                                    bg="#E90808"
                                    autoContrast
                                    mb={'10px'}
                                    fw="normal"
                                >
                                    + Add Photos
                                </Button>
                                <Text size="sm" c="dimmed">
                                    (Max limit 5 MB per image)
                                </Text>
                            </div>
                        </div>
                        {images.length > 0 && (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext items={images.map((_, index) => index.toString())}>
                                    <SimpleGrid
                                        cols={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
                                        mt="md"
                                        style={{
                                            display: 'flex',
                                            flexWrap: 'wrap',
                                            justifyContent: 'center',
                                            gap: '16px',
                                            padding: '16px',
                                        }}
                                    >
                                        {images.map((file, index) => (
                                            <SortableImage
                                                key={index}
                                                file={file}
                                                index={index}
                                            />
                                        ))}
                                    </SimpleGrid>
                                </SortableContext>
                            </DndContext>
                        )}
                        <Group align="flex-start" gap="xl" justify="center" mt={'50px'}>
                            <Text size="sm" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '450px', textAlign: 'left' }}>
                                <MdCheckCircle size={20} color="#4CAF50" style={{ flexShrink: 0, marginTop: '2px' }} />
                                Adding at least 8 pictures improves the chances for a quick sale.
                            </Text>
                            <Text size="sm" style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '450px', textAlign: 'left' }}>
                                <MdCheckCircle size={20} color="#4CAF50" style={{ flexShrink: 0, marginTop: '2px' }} />
                                Adding clear Front, Back and Interior pictures of your car increases the quality of your Ad and gets you noticed more.
                            </Text>
                        </Group>
                        <Text size="sm" mt={"20px"} style={{ display: 'flex', margin: 'auto', alignItems: 'center', gap: '8px', justifyContent: 'center', maxWidth: '450px', textAlign: 'left' }}>
                            <MdCheckCircle size={20} color="#4CAF50" />
                            Photos should be in 'jpeg, jpg, png, gif' format only.
                        </Text>
                    </div>
                </Box>
            </Dropzone>
            {form.errors.images && (
                <Text size="sm" c="red">
                    {form.errors.images}*
                </Text>
            )}
        </Box>
    );
};

/**
 * FormFieldBodyType Component
 * Renders a body type field with label and body types
 */


export const FormFieldBodyType = ({ label, bodies, form }) => (
    <>
        {console.log(bodies?.bodies, "bodies......")}
        <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
            <Input.Label required size="md" tt="capitalize">{label}</Input.Label>
        </Box>
        <Box className="col-md-7">
            <Grid mb="lg">
                {bodies?.bodies?.map((bodyType) => (
                    <Grid.Col
                        span={4}
                        ta="center"
                        key={bodyType.title}
                    >
                        <div className="single-brand-item selected-brand-item text-center">
                            <label
                                className={`text-decoration-none ${form.values.body === bodyType._id ||
                                    form.values.body.toLowerCase() === bodyType.title.toLowerCase()
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
                                        form.values.body.toLowerCase() == bodyType.title.toLowerCase()
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
export const FormFieldFeature = ({ label, form, features }) => {
    return (
        <>
            <Box className="col-md-2 text-lg-end mb-2 mb-lg-0">
                {/* <Input.Label required size="md" tt="capitalize">{label}</Input.Label> */}
            </Box>
            <Box className="col-md-10">
                <Accordion variant="default">
                    {features?.map((category, categoryIndex) => (
                        <Accordion.Item 
                            key={categoryIndex} 
                            mt="md"
                            value={category.category}
                        >
                            <Accordion.Control>
                                <Text fw={500}>{category.category}</Text>
                            </Accordion.Control>
                            <Accordion.Panel>
                                <Grid>
                                    {category.items.map((item, itemIndex) => {
                                        const [featureKey, featureValue] = Object.entries(item)[0];
                                        const displayValue = Array.isArray(featureValue) 
                                            ? featureValue[0] 
                                            : featureValue;
                                        
                                        return (
                                            <Grid.Col span={4} key={itemIndex}>
                                                <Box>
                                                    <Text fw={500} size="sm" tt="capitalize" c="#E90808">
                                                        {featureKey}
                                                    </Text>
                                                    <Text size="sm" c="dimmed">
                                                        {displayValue}
                                                    </Text>
                                                </Box>
                                            </Grid.Col>
                                        );
                                    })}
                                </Grid>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
                {form.errors.features && (
                    <Text size="sm" c="red" mt="sm">
                        {form.errors.features}*
                    </Text>
                )}
            </Box>
        </>
    );
}
