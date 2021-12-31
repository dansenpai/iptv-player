import { useEffect, useState } from 'react';
import './App.css';
import parser from 'iptv-playlist-parser'
import lista from './lista';
import styled from 'styled-components';


const ChannelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding:  40px;
  border: 1px solid #aaa;
  width: 130px;
  text-align: center;
  margin-bottom: 40px;
  border-radius: 8px;
  height: 40px;
  margin-right: 10px;
`;

const ItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 40px;
  cursor: pointer;
`;

const Back = styled.div`
  padding: 10px;
  margin-left: 40px;
  cursor: pointer;
  border: 1px solid #aaa;
  width: 80px;
  margin-top: 20px;
  text-align: center;
  border-radius: 8px;
`;

const Title = styled.div`
  padding: 20px 0 0 40px;
  cursor: pointer;
  font-size: 29px;
  font-weight: bold;
`;

const Header = styled.div``;

const result = parser.parse(lista);

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showEpisodes, setShowEpisodes] = useState(false);

  const items = {};
  result.items.map(item => {


    const type = item.group.title.split('|')[0];
    const channelName = item.group.title.split('|')[1];

    if(items[channelName]) {
      items[channelName].push(item);
    } else {
     items[channelName] = [];
     items[channelName].push(item);
    }
    
    return(
      <div>{item.name}</div>
    )
  })

  function selectCategory(key){
    setSelectedCategory(key);
    setShowEpisodes(true);
  }

  function openEpisode(item){
    console.log(item)
  }

  function goBack(){
    setShowEpisodes(false);
  }

  return (
    <>
    <Header>
      <Title>IPTV</Title>
    </Header>

    {!showEpisodes && (
      <ItemsWrapper>
      {Object.keys(items).map(key => {
        if(key === 'undefined') return null;
        
        return(
          <ChannelWrapper onClick={() => selectCategory(key)}>
            <div>{key}</div>
          </ChannelWrapper>
        )
      })}
      </ItemsWrapper>
    )}
     
     {showEpisodes && (
       <>
        <Back onClick={goBack}>Voltar</Back>
        <ItemsWrapper>
          {items[selectedCategory].map(item => {
            return(
              <ChannelWrapper onClick={() => openEpisode(item)}>
                <div>{item.name}</div>
              </ChannelWrapper>
            )
          })}
        </ItemsWrapper>
      </>
     )}
    </>
  );
}

export default App;
