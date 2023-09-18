'use client'
import React, { useState, useEffect } from 'react';
import GoogleMapComponent from './components/GoogleMap';
import Select, { ActionMeta, MultiValue } from 'react-select';
import Card from './components/Card';

export const localData = [
  {
    id: 1,
    name: 'Local 1',
    category: 'alimentos y bebidas',
    image: 'https://c8.alamy.com/compes/2kf3yxx/locales-comerciales-de-alquiler-calle-principal-lowestoft-suffolk-2022-2kf3yxx.jpg',
    phone: '123-456-7890',
    email: 'local1@example.com',
    address: 'Carrera 50, Bogotá',
    lat: 4.6097,
    lng: -74.0817,
  },
  {
    id: 2,
    name: 'Local 2',
    category: 'variedades',
    image: 'https://c8.alamy.com/compes/b52b72/tienda-vacia-para-permitir-o-para-su-venta-en-knaresborough-north-yorkshire-inglaterra-b52b72.jpg',
    phone: '123-456-7890',
    email: 'local2@example.com',
    address: 'Dirección 1, Medellín',
    lat: 6.2518,
    lng: -75.5636,
  },
  {
    id: 3,
    name: 'Local 3',
    category: 'otros',
    image: 'https://c8.alamy.com/compes/2jd1mw6/las-tiendas-y-las-instalaciones-minoristas-se-embarcaron-o-se-vaciaron-debido-a-la-presion-economica-que-se-suma-al-concepto-de-ciudad-fantasma-en-el-centro-de-la-ciudad-2jd1mw6.jpg',
    phone: '123-456-7890',
    email: 'local3@example.com',
    address: 'Dirección 1, Apartadó',
    lat: 7.8853,
    lng: -76.6346,
  },
  {
    id: 4,
    name: 'Local 4',
    category: 'alimentos y bebidas',
    image: 'https://images.pexels.com/photos/1884573/pexels-photo-1884573.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local4@example.com',
    address: 'Dirección 1, Cali',
    lat: 3.4516,
    lng: -76.5320,
  },
  {
    id: 5,
    name: 'Local 5',
    category: 'variedades',
    image: 'https://images.pexels.com/photos/2574474/pexels-photo-2574474.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local1@example.com',
    address: 'Dirección 1, Barranquilla',
    lat: 10.9639,
    lng: -74.7964,
  },
  {
    id: 6,
    name: 'Local 6',
    category: 'alimentos y bebidas',
    image: 'https://images.pexels.com/photos/1458681/pexels-photo-1458681.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local2@example.com',
    address: 'Dirección 1, Bucaramanga',
    lat: 7.1194,
    lng: -73.1227,
  },
  {
    id: 7,
    name: 'Local 7',
    category: 'alimentos y bebidas',
    image: 'https://images.pexels.com/photos/916446/pexels-photo-916446.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local3@example.com',
    address: 'Dirección 1, Bogotá',
    lat: 4.6099,
    lng: -74.0819,
  },
  {
    id: 8,
    name: 'Local 8',
    category: 'alimentos y bebidas',
    image: 'https://images.pexels.com/photos/2448800/pexels-photo-2448800.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local4@example.com',
    address: 'Dirección 1, Medellín',
    lat: 6.2520,
    lng: -75.5620,
  },
  {
    id: 9,
    name: 'Local 9',
    category: 'variedades',
    image: 'https://images.pexels.com/photos/984869/pexels-photo-984869.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local2@example.com',
    address: 'Carrera 50, Bogotá',
    lat: 4.6102,
    lng: -74.0815,
  },
  {
    id: 10,
    name: 'Local 10',
    category: 'otros',
    image: 'https://images.pexels.com/photos/2448730/pexels-photo-2448730.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local3@example.com',
    address: 'Dirección 1, Bogotá',
    lat: 4.6098,
    lng: -74.0820,
  },
  {
    id: 11,
    name: 'Local 11',
    category: 'alimentos y bebidas',
    image: 'https://images.pexels.com/photos/1850615/pexels-photo-1850615.jpeg?auto=compress&cs=tinysrgb&w=600',
    phone: '123-456-7890',
    email: 'local4@example.com',
    address: 'Carrera 50, Bogotá',
    lat: 4.6100,
    lng: -74.0813,
  },

];
interface CityOption {
  value: string;
  label: string;
}

interface SelectedCityOption extends CityOption {
  value: string;
  label: string;
}

interface CategoryOption {
  value: string;
  label: string;
}
interface SelectedCategoryOption extends CategoryOption {
  value: string;
  label: string;
}

function Home() {

  const [highlightedMark, setHighlightedMark] = useState<number | null>(null);
  const [selectedCity, setSelectedCity] = useState<SelectedCityOption | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategoryOption[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const displayedImages = localData.slice(indexOfFirstImage, indexOfLastImage);
  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleMarkerMouseEnter = (index: number) => {
    setHighlightedMark(index);
  };

  const handleMarkerMouseLeave = () => {
    setHighlightedMark(null);
  };

  const createMarkerMouseOverHandler = (index: number) => {
    handleMarkerMouseEnter(index);
  };

  const createMarkerMouseOutHandler = () => {
    handleMarkerMouseLeave();
  };

  const handleCityChange = (selectedOption: SelectedCityOption | null) => {
    setSelectedCity(selectedOption);
  };

  const handleCategoriesChange = (
    newValue: MultiValue<SelectedCategoryOption>,
    actionMeta: ActionMeta<SelectedCategoryOption>
  ) => {
    setSelectedCategories(newValue as SelectedCategoryOption[]);
  };

  const cityOptions: CityOption[] = [
    { value: 'all', label: 'Todos los comercios' },
    ...Array.from(new Set(localData.map((local) => local.address.split(', ')[1]).filter(city => city)))
      .map(city => ({ value: city, label: city }))
  ];

  const categoryOptions: CategoryOption[] = Array.from(new Set(localData
    .map((local) => local.category)))
    .map(category => ({ value: category, label: category }));

  return (
    <main className="flex flex-col min-h-screen p-1 sm:p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between ml-4 sm:ml-8 mb-2 sm:mb-6">
        {/* Selectores */}
        <div className="w-full sm:w-1/3">
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={cityOptions}
            placeholder="Escribe una ciudad..."
            className="my-4 pt-5 sm:mr-2"
          />
        </div>
        <div className="w-full sm:w-1/3">
          <Select
            value={selectedCategories}
            onChange={handleCategoriesChange}
            options={categoryOptions}
            isMulti
            placeholder="Selecciona una o varias categorías..."
            className="-my-4 pt-5"
          />
        </div>
        <div className="w-full sm:w-1/3 sm:mr-2 ml-5 pl-3 sm:mt-0">
          <h1 className="text-xl font-bold sm:mr-2 ml-3 pt-6 sm:text-2xl">Comercios Disponibles</h1>
        </div>

        <img src="/Logo-Vaale.png" alt="Logotipo" className="w-19 h-16 text-red-500 pt-2 sm:mr-2 pr-9" />

      </div>

      <div className="flex flex-col sm:flex-row">
        <div className="w-full sm:w-2/2 ml-6 p-1">
          <div className="flex flex-wrap justify-evenly -m-5 mr-2 sm:-m-2">
            {/* Mapeo de imágenes */}
            {displayedImages
              .filter((local) =>
                (!selectedCity || selectedCity.value === 'all' || local.address.includes(selectedCity.value)) &&
                (!selectedCategories || selectedCategories.length === 0 || selectedCategories.some(cat => cat.value === local.category))
              )
              .map((local) => (
                <Card key={local.id} local={local} highlightedMark={highlightedMark} createMarkerMouseOverHandler={createMarkerMouseOverHandler} createMarkerMouseOutHandler={createMarkerMouseOutHandler} />
              ))}
          </div>
          {/* Controles de paginación */}
          <div className="pagination my-8 flex justify-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-white bg-purple-500 py-2 my-3 px-4 rounded mr-3"
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastImage >= localData.length}
              className="bg-purple-500 text-white py-2 my-3 px-4 rounded"
            >
              Siguiente
            </button>
          </div>
        </div>

        <div className="w-full sm:w-1/2 py-7 sm:mt-0">
          {/* Componente de Google Map */}
          <div className="map-container w-full sm:w-4/5 lg:w-3/5 mt-4 sm:mt-0">
            <GoogleMapComponent local={localData} highlightedMark={highlightedMark} createMarkerMouseOverHandler={createMarkerMouseOverHandler} createMarkerMouseOutHandler={createMarkerMouseOutHandler} />
          </div>
        </div>
      </div>
    </main>
  );

}

export default function MyClientPage() {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? <Home /> : <div />;
}



















{/* 
function Home(clickedMarker: any) {


  const [highlightedMark, setHighlightedMark] = useState<number | null>(null);
  const [HighlightedImage, setHighlightedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 9;
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const displayedImages = localData.slice(indexOfFirstImage, indexOfLastImage);
  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

  const handleMarkerMouseEnter = (index: number) => {
    return setHighlightedMark(index);
  };
  const handleImageMouseEnter = (index: number) => {
    return setHighlightedImage(index);
  };

  const handleMarkerMouseLeave = () => {
    setHighlightedMark(null);
    setHighlightedImage(null);
  };

  const createMarkerMouseOverHandler = (index: number) => {
    return () => {
      handleMarkerMouseEnter(index);
      handleImageMouseEnter(index);

    };
  };

  const createMarkerMouseOutHandler = () => {
    return () => {
      handleMarkerMouseLeave();
    };
  };

  const [selectedCity, setSelectedCity] = useState<SelectedCityOption | null>(null);

  const handleCityChange = (selectedOption: SelectedCityOption | null) => {
    setSelectedCity(selectedOption);
  };

  const [selectedCategories, setSelectedCategories] = useState<SelectedCategoryOption[] | null>(null);

  const handleCategoriesChange = (
    newValue: MultiValue<SelectedCategoryOption>,
    actionMeta: ActionMeta<SelectedCategoryOption>
  ) => {
    setSelectedCategories(newValue as SelectedCategoryOption[]);
  };

  const cityOptions: CityOption[] = [
    { value: 'all', label: 'Todos los comercios' },
    ...Array.from(new Set(localData.map((local) => local.address.split(', ')[1]).filter(city => city)))
      .map(city => ({ value: city, label: city }))
  ];

  const categoryOptions: CategoryOption[] = Array.from(new Set(localData
    .map((local) => local.category)))
    .map(category => ({ value: category, label: category }));

  return (
    <main className="flex flex-col min-h-screen p-2 sm:p-6">
      <div className="flex items-center justify-between ml-8 mb-2 sm:mb-6">
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          options={cityOptions}
          placeholder="Escribe una ciudad..."></Select>
        <Select
          value={selectedCategories}
          onChange={handleCategoriesChange}
          options={categoryOptions}
          isMulti
          placeholder="Selecciona una o varias categorías..."
        />

        <h1 className="text-xl font-bold mt-1 ml-1 sm:mt-2 sm:ml-5">Comercios Disponibles</h1>
        <div className="flex items-center justify-center mb-1 sm:mb-4">
          <img src="/Logo-Vaale.png" alt="Logotipo" className="w-19 h-14 text-red-500 pr-6" />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-2/2 p-1 sm:w-full">
          <div className="flex flex-wrap">

            {displayedImages
              .filter((local) =>
                (!selectedCity || selectedCity.value === 'all' || local.address.includes(selectedCity.value)) &&
                (!selectedCategories || selectedCategories.length === 0 || selectedCategories.some(cat => cat.value === local.category))
              )
              .map((local) => (

                <div

                  key={local.id}
                  className={`w-full sm:w-2/2 lg:w-1/3 mr-9  p-1 sm:p-2  mt-3  my-14  ${highlightedMark === local.id ? 'image-hover-shadow' : ''
                    } ${highlightedMark === local.id ? 'image-hover-pointer' : ''}`} style={{ width: '180px', height: '180px' }}
                  onMouseEnter={createMarkerMouseOverHandler(local.id)}
                  onMouseLeave={createMarkerMouseOutHandler}
                >
                  <div className={`square-image-wrapper ${highlightedMark === local.id ? 'img-hovered' : ''}`} style={{ width: '100%', height: '100%' }}>
                    <div className="square-image-inner">
                      <Image src={local.image} alt={local.name} layout="fill" objectFit="cover" className="rounded-md" />
                    </div>
                  </div>
                  <div className="max-w-full">
                    <h2 className="text-lg font-bold mt-1 mb-1">{local.name}</h2>
                    <p className="text-black-600 text-xs text-justify">{local.phone}</p>
                    <p className="text-black-600 text-xs text-justify">{local.email}</p>
                  </div>
                </div>

              ))}

          </div>
          
          <div className="pagination my-8 flex justify-center pr-5">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="text-white bg-purple-500 py-2 px-4 rounded mr-4"
            >
              Anterior
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastImage >= localData.length}
              className="bg-purple-500 text-white py-2 px-4 rounded"
            >
              Siguiente
            </button>
          </div>
        </div>
        <div className="lg:w-3/4 gap-1 -m-1 my-5 sm:w-full lg:order-last">
          
          <GoogleMapComponent local={localData} highlightedMark={highlightedMark} createMarkerMouseOverHandler={ createMarkerMouseOverHandler} createMarkerMouseOutHandler={createMarkerMouseOutHandler}/>
        </div>
      </div>
    </main>
  );
} */}

// export default function MyClientPage() {
//   const [isClient, setIsClient] = useState<boolean>(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   return isClient ? <Home /> : <div />;
// }
