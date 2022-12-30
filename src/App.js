import React, { useState, useEffect, useRef } from 'react';
import { Space, Table, Card, Input, Button, Menu, Select, Spin } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import dataset from './datasets/with_description.json';

function App() {
  const [data, setData] = useState(null);
  const [rating, setRating] = useState("");
  for (var i = 0; i < dataset.length; i = i + 1) {
    dataset[i]["key"] = dataset[i][""]
  }


  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Minimum ${dataIndex} Score`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      parseInt(record[dataIndex].split("/")[0]) >= parseInt(value),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
        parseInt(text.split("/")[0])
      ,
  });

  const columns = [
    {
      title: 'Title',
      dataIndex: 'Title',
      render: (e, record) => {
        let link = "https://google.com/search?q=" + e
        return <a href={link} target='_blank'>{e}</a>
      }
    },
    {
      title: 'Year',
      dataIndex: 'Year',
      sorter: (a, b) => a['Year'] - b['Year']
    },
    {
      title: 'Rotten Tomatoes',
      dataIndex: 'Rotten Tomatoes',
      // sorter: (a, b) => {
      //   var split =  a["Rotten Tomatoes"].split("/")
      //   const a_int = parseInt(split[0])
      //   var split_b =  b["Rotten Tomatoes"].split("/")
      //   const b_int = parseInt(split_b[0])
      //   return a_int - b_int
      // },
      ...getColumnSearchProps('Rotten Tomatoes')
    },
    {
      title: "Genres",
      dataIndex: 'genres',
      render: (e) => {
        return e.replace(/[\[\]']+/g,'')
      },
      filters: [
        {
          text: 'drama',
          value: 'drama',
        },
        {
          text: 'crime',
          value: 'crime',
        },
        {
          text: 'romance',
          value: 'romance',
        },
        {
          text: 'animation',
          value: 'animation',
        },
        {
          text: 'scifi',
          value: 'scifi',
        },
        {
          text: 'thriller',
          value: 'thriller',
        },
        {
          text: 'horror',
          value: 'horror',
        },
        {
          text: 'european',
          value: 'european',
        },
        {
          text: 'fantasy',
          value: 'fantasy',
        },
        {
          text: 'action',
          value: 'action',
        },
        {
          text: 'family',
          value: 'family',
        },
      ],
      onFilter: (value, record) => {
        return record['genres'].includes(value)
      },
    },
    {
      title: 'Netflix',
      dataIndex: 'Netflix',
      render: (e) => {
        if (e === 1) {
          return "Yes"
        } else {
          return "No"
        }
      },
      filters: [
        {
          text: 'Yes',
          value: 1,
        },
        {
          text: 'No',
          value: 0,
        },
      ],
      onFilter: (value, record) => record["Netflix"] === value
    },
    {
      title: 'Hulu',
      dataIndex: 'Hulu',
      render: (e) => {
        if (e === 1) {
          return "Yes"
        } else {
          return "No"
        }
      },
      filters: [
        {
          text: 'Yes',
          value: 1,
        },
        {
          text: 'No',
          value: 0,
        },
      ],
      onFilter: (value, record) => record["Hulu"] === value
    },
    {
      title: 'Disney+',
      dataIndex: 'Disney+',
      render: (e) => {
        if (e === 1) {
          return "Yes"
        } else {
          return "No"
        }
      },
      filters: [
        {
          text: 'Yes',
          value: 1,
        },
        {
          text: 'No',
          value: 0,
        },
      ],
      onFilter: (value, record) => record["Disney+"] === value
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      render: (e) => {
        if (e === 1) {
          return "TV"
        } else {
          return "Movie"
        }
      },
      filters: [
        {
          text: 'TV',
          value: 1,
        },
        {
          text: 'Movie',
          value: 0,
        },
      ],
      onFilter: (value, record) => record["Type"] === value
    }
  ];

  const [current, setCurrent] = useState('full');
  const items = [
    {
      label: 'Full List',
      key: 'full',
    },
    {
      label: 'Random Generator',
      key: 'random',
    },
  ]
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  function getRndInteger(max) {
    return Math.floor(Math.random() * (max - 0) ) + 0;
  }
  const [random, setRandom] = useState([dataset[getRndInteger(6835)]]);
  const [type, setType] = useState(0);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(false);

  const randomize = (e) => {
    setLoading(true)
    var loaded = dataset.filter(x => (x['genres'].includes(genre)))
    loaded = loaded.filter(x => x['Type'] == type)
    if (loaded.length == 0) {
      setRandom([])
    }
    var num = getRndInteger(loaded.length)
    setLoading(false)
    setRandom([loaded[num]])
  }

  const handleTypeChange = (e) => {
    setType(e)
  }

  const handleGenreChange = (e) => {
    setGenre(e)
  }

  const renderCard = (record) => {
    var platform = []
    if (record['Netflix'] == 1) {
      platform.push('netflix')
    }
    if (record['Hulu'] == 1) {
      platform.push('hulu')
    }
    if (record['Disney+'] == 1) {
      platform.push('disneyplus')
    }
    var html_line = []
    for (var i = 0; i < platform.length; i++) {
      var link = "https://" + platform[i] + ".com/search?q=" + record['Title']
      html_line.push(<div><a href={link} target='_blank'>{platform[i]}</a> <br></br></div>)
    }
    return  (
      <div>
        <p
          style={{
            margin: 0,
          }}
        >
          {record.description}
        </p>
        <p>
          Genres: {record['genres'].replace(/[\[\]']+/g,'')}
        </p>
        {html_line.map(x => x)}
      </div>
      )
  }

    return (
      <div>
        <Card>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <p></p>
        {current == 'full' &&
          <Card type='inner' title="List of all Movies and TV Shows">
            <Card type='inner'>
              <Table 
                columns={columns} 
                expandable={{
                  expandedRowRender: (record) => {
                    var platform = []
                    if (record['Netflix'] == 1) {
                      platform.push('netflix')
                    }
                    if (record['Hulu'] == 1) {
                      platform.push('hulu')
                    }
                    if (record['Disney+'] == 1) {
                      platform.push('disneyplus')
                    }
                    var html_line = []
                    for (var i = 0; i < platform.length; i++) {
                      var link = "https://" + platform[i] + ".com/search?q=" + record['Title']
                      html_line.push(<div><a href={link} target='_blank'>{platform[i]}</a> <br></br></div>)
                    }
                    return  (
                      <div>
                        <p
                          style={{
                            margin: 0,
                          }}
                        >
                          {record.description}
                        </p>
                        {html_line.map(x => x)}
                      </div>
                      )
                  },
                  rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={dataset}
              />
            </Card>
          </Card>
        }
        {current == 'random' &&
          <Card title="Choose Random Movie or TV Show">
            <Space>
              Filters: 
            <Select
                defaultValue={0}
                style={{
                  width: 120,
                }}
                onChange={handleTypeChange}
                options={[
                  {
                    value: 0,
                    label: 'movie',
                  },
                  {
                    value: 1,
                    label: 'tv',
                  },
                ]}
              />
              <Select
                defaultValue='any'
                style={{
                  width: 120,
                }}
                onChange={handleGenreChange}
                options={
                  [
                    {
                      label: 'any',
                      value: '',
                    },
                    {
                      label: 'drama',
                      value: 'drama',
                    },
                    {
                      label: 'crime',
                      value: 'crime',
                    },
                    {
                      label: 'romance',
                      value: 'romance',
                    },
                    {
                      label: 'animation',
                      value: 'animation',
                    },
                    {
                      label: 'scifi',
                      value: 'scifi',
                    },
                    {
                      label: 'thriller',
                      value: 'thriller',
                    },
                    {
                      label: 'horror',
                      value: 'horror',
                    },
                    {
                      label: 'european',
                      value: 'european',
                    },
                    {
                      label: 'fantasy',
                      value: 'fantasy',
                    },
                    {
                      label: 'action',
                      value: 'action',
                    },
                    {
                      label: 'family',
                      value: 'family',
                    },
                  ]
                }
              />
            </Space>
            <p></p>
            {loading &&
              <Spin />
            }
            {random && (loading == false) &&
              <div>
                <Card type='inner' title={random[0]['Title']}>
                  {renderCard(random[0])}
                </Card>
                <Table 
                columns={columns} 
                expandable={{
                expandedRowRender: (record) => {
                  var platform = []
                  if (record['Netflix'] == 1) {
                    platform.push('netflix')
                  }
                  if (record['Hulu'] == 1) {
                    platform.push('hulu')
                  }
                  if (record['Disney+'] == 1) {
                    platform.push('disneyplus')
                  }
                  var html_line = []
                  for (var i = 0; i < platform.length; i++) {
                    var link = "https://" + platform[i] + ".com/search?q=" + record['Title']
                    html_line.push(<div><a href={link} target='_blank'>{platform[i]}</a> <br></br></div>)
                  }
                  return  (
                    <div>
                      <p
                        style={{
                          margin: 0,
                        }}
                      >
                        {record.description}
                      </p>
                      {html_line.map(x => x)}
                    </div>
                    )
                },
                  rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={random}
              />
            </div>
            }
            <Button 
            type="primary" 
            size="small"
            onClick={randomize}
            >
              Randomize
            </Button>
          </Card>
        } 
        </Card>
      </div>
    );
}

export default App;
