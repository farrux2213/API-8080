import "./App.css";
import { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Upload,
  Skeleton,
  Switch,
  Spin,
  Carousel,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const App = () => {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewFlower, setViewFlower] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );
      const data = await response.json();
      setTimeout(() => {
        setFlowers(data.data);
        setLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  const onFinish = async (values) => {
    const shouldUpload = {
      title: values.title,
      price: values.price,
      main_image: values.main_image.file.response.image_url.url,
      discount: values.discount,
      discount_price: values.discount_price,
      detailed_images: [
        values.detaled_image_1.file.response.image_url.url,
        values.detaled_image_2.file.response.image_url.url,
        values.detaled_image_3.file.response.image_url.url,
        values.detaled_image_4.file.response.image_url.url,
      ],
      rate: 0,
      views: 0,
      tags: [],
      comments: [values.comments],
      short_description: values.shortDescription,
      description: values.description,
    };

    await fetch(
      "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shouldUpload),
      }
    );
    setFlowers([...flowers, shouldUpload]);
    setOpen(false);
  };

  const deleteImage = async (imageId) => {
    await fetch(
      `http://localhost:8080/api/flower/category/${imageId}?access_token=64bebc1e2c6d3f056a8c85b7`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
        },
      }
    );
    setFlowers(flowers.filter((flower) => flower._id !== imageId));
  };

  const onSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const showFlowerDetails = (flower) => {
    setViewFlower(flower);
    setViewModalVisible(true);
  };

  return (
    <div className="bg-white">
      <Modal
        okText="Create"
        onOk={() => setOpen(false)}
        visible={open}
        onCancel={() => setOpen(false)}
        title="Add Flower"
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input your title!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Main Image"
            name="main_image"
            rules={[
              {
                required: true,
                message: "Please upload your image!",
              },
            ]}
          >
            <Upload
              name="image"
              action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="1-Detailed Image"
            name="detaled_image_1"
            rules={[
              {
                required: true,
                message: "Please upload your image!",
              },
            ]}
          >
            <Upload
              name="image"
              action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="2-Detailed Image"
            name="detaled_image_2"
            rules={[
              {
                required: true,
                message: "Please upload your image!",
              },
            ]}
          >
            <Upload
              name="image"
              action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="3-Detailed Image"
            name="detaled_image_3"
            rules={[
              {
                required: true,
                message: "Please upload your image!",
              },
            ]}
          >
            <Upload
              name="image"
              action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="4-Detailed Image"
            name="detaled_image_4"
            rules={[
              {
                required: true,
                message: "Please upload your image!",
              },
            ]}
          >
            <Upload
              name="image"
              action="http://localhost:8080/api/upload?access_token=64bebc1e2c6d3f056a8c85b7"
            >
              <Button>Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your discount!",
              },
            ]}
          >
            <Switch defaultChecked onChange={onSwitch} />
          </Form.Item>

          <Form.Item
            label="Discount Price"
            name="discount_price"
            rules={[
              {
                required: true,
                message: "Please input your discount price!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label="Short Description"
            name="shortDescription"
            rules={[
              {
                required: true,
                message: "Please input your short description!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your description!",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>

          <Form.Item
            label="Comments"
            name="comments"
            rules={[
              {
                required: true,
                message: "Please input your comments!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button danger onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button htmlType="submit">Create</Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={viewModalVisible}
        title="Flower Details"
        onCancel={() => setViewModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setViewModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {viewFlower && (
          <>
            <h3>Title: {viewFlower.title}</h3>
            <p>Description: {viewFlower.description}</p>
            <p>Price: {viewFlower.price}</p>
            <p>Discount: {viewFlower.discount ? "Yes" : "No"}</p>
            <p>Discount Price: {viewFlower.discount_price}</p>
            <p>Short Description: {viewFlower.short_description}</p>
            <Carousel>
              {viewFlower.detailed_images.map((img, index) => (
                <div key={index}>
                  <img
                    src={img}
                    alt={`detail ${index}`}
                    style={{ width: "100%" }}
                  />
                </div>
              ))}
            </Carousel>
          </>
        )}
      </Modal>

      <div className="absolute top-2 right-10">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>

      <div className="box">
        {loading ? (
          <div className="flex flex-col w-[490px] h-[800px] m-auto gap-[30px] ml-[450px]">
            <Spin
              size="large"
              style={{
                margin: "auto",
              }}
            />
            {[...Array(10)].map((_, index) => (
              <Skeleton key={index} active paragraph={{ rows: 1 }} />
            ))}
          </div>
        ) : (
          flowers.map(
            ({
              _id,
              title,
              short_description,
              detailed_images,
              description,
              price,
              discount,
              discount_price,
            }) => (
              <Card
                key={_id}
                hoverable
                style={{
                  width: 300,
                }}
                onMouseEnter={() => setHoveredCard(_id)}
                onMouseLeave={() => setHoveredCard(null)}
                cover={
                  <Carousel autoplay={hoveredCard === _id}>
                    {detailed_images.map((img, index) => (
                      <div key={index}>
                        <img alt={`flower-${index}`} src={img} />
                      </div>
                    ))}
                  </Carousel>
                }
                actions={[
                  <SettingOutlined
                    key="setting"
                    onClick={() =>
                      showFlowerDetails({
                        _id,
                        title,
                        short_description,
                        description,
                        price,
                        discount,
                        discount_price,
                        detailed_images,
                      })
                    }
                  />,
                  <EditOutlined key="edit" />,
                  <DeleteOutlined
                    key="delete"
                    onClick={() => deleteImage(_id)}
                  />,
                ]}
              >
                <Meta title={title} description={short_description} />
              </Card>
            )
          )
        )}
      </div>
    </div>
  );
};

export default App;
