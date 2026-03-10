export default function HelloWorld(){
    
    const propsUserCard = {
        nama: "Goku",
        nim: "999999",
        tanggal: "2025-01-01"
    }

    return (
        <div>
            <h1>Hello World</h1>
            <p>Selamat Belajar ReactJs</p>

        <img src="img/bunga1.jpg" alt="logo" width="100%"/>

            <GreetingBinjai/>
            <QuoteText/>
            <UserCard 
	            nama="Haya" 
	            nim="2457301066"
	            tanggal="2026/03/10"
	          />
            <UserCard 
	            nama="Naaila" 
	            nim="24573010112"
	            tanggal="2026/03/10"
	          />
            <UserCard {...propsUserCard}/>

            
        </div>
    )
}

function QuoteText() {
    const text = "Mulutmu Harimaumu";
    const text2 = "Aku ingin jadi macan";
    return (
        <div>
            <hr/>
            <p>{text.toLowerCase()}</p>
            <p>{text2.toUpperCase()}</p>
        </div>
    )
}

function GreetingBinjai(){
    return (
        <small>Salam dari Binjai</small>    
    )
}

function UserCard(props){
    return (
        <>
            <hr/>
            <h3>Nama: {props.nama}</h3>
            <p>NIM: {props.nim}</p>
            <p>Tanggal: {props.tanggal}</p>
        </>
    )
}