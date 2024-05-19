import "./App.css";
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
  Space,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useEffect, useState, createContext } from "react";
const { Meta } = Card;

function App() {
  const [flowers, setFlowers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [close, setClose] = useState(false);
  const ReachableContext = createContext(null);
  const UnreachableContext = createContext(null);

  const onFinish = async (values) => {
    console.log(values);

    const shouldUpload = {
      title: values.title,
      price: values.price,
      main_image: values.main_image.file.response.image_url.url,
      discount: values.discount,
      discount_price: values.discount_price,
      detailed_images: [
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://www.coartsinnovation.com/wp-content/uploads/2021/05/Artificial-Topiary-CAJM-7136.png",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169512/743847/5965__41958.1630728740.jpg?c=2",
        "https://cdn11.bigcommerce.com/s-2mpfm/images/stencil/640w/products/169089/743279/5493__27309.1630683935.jpg?c=2",
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

    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:8080/api/flower/category/house-plants?access_token=64bebc1e2c6d3f056a8c85b7"
      );

      const data = await response.json();

      setTimeout(() => {
        // Simulate delay for skeleton loaders
        setFlowers(data.data);
        setLoading(false); // Set loading state to false once data is fetched
      }, 1000); // Adjust the delay as needed
    };

    fetchData();
  }, []);

  const onSwitch = (checked) => {
    console.log(`switch to ${checked}`);
  };
  const [modal, contextHolder] = Modal.useModal();

  const config = {
    title: "INFO FLOWERS",
    content: (
      <>
        {/* <ReachableContext.Consumer>
          {(name) => `Reachable: ${name}!`}
        </ReachableContext.Consumer>
        <br />
        <UnreachableContext.Consumer>
          {(name) => `Unreachable: ${name}!`}
        </UnreachableContext.Consumer> */}
        {flowers.map(
          ({
            _id,
            title,
            price,
            discount,
            discount_price,
            short_description,
            description,
            rate,
            views,
            tags,
            comments,
            created_by,
            created_at,
            __v,
          }) => (
            <Card
              key={_id}
              hoverable
              style={{
                width: 300,
              }}
            >
              <Meta
                id={_id}
                title={title}
                price={price}
                discount={discount}
                discount_price={discount_price}
                shortDescription={short_description}
                description={description}
                rate={rate}
                views={views}
                tags={tags}
                comments={comments}
                created_by={created_by}
                created_at={created_at}
                __v={__v}
              />
            </Card>
          )
        )}
      </>
    ),
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
            label="Upload"
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
                message: "Please input your price!",
              },
            ]}
          >
            <Switch defaultChecked onChange={onSwitch} />
          </Form.Item>

          <Form.Item
            label="Discount_price"
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
            label="Short description"
            name="shortDescription"
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
            label="Description"
            name="description"
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
      <div className="absolute top-2 right-10">
        <Button
          onClick={() => {
            setOpen(true);
          }}
        >
          Add
        </Button>
      </div>
      <div>
        <ReachableContext.Provider value="odusuf">
          <Space></Space>
          {/* `contextHolder` should always be placed under the context you want to access */}
          {contextHolder}

          {/* Can not access this context since `contextHolder` is not in it */}
          <UnreachableContext.Provider value="Bamboo" />
        </ReachableContext.Provider>
      </div>
      <div className="box">
        {loading ? (
          <>
            <div className="flex flex-col w-[490px] h-[800px] m-auto gap-[30px] ml-[450px]">
              <Spin
                size="large"
                style={{
                  margin: "auto",
                }}
              />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          </>
        ) : (
          // Render actual flower cards once data is loaded

          flowers.map(({ _id, main_image, title, short_description }) => (
            <Card
              key={_id}
              hoverable
              style={{
                width: 300,
              }}
              cover={<img alt="example" src={main_image} />}
              actions={[
                <SettingOutlined
                  key="setting"
                  onClick={async () => {
                    const confirmed = await modal.confirm(config);
                    console.log("Confirmed: ", confirmed);
                  }}
                />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta title={title} description={short_description} />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
