import "./Detail.css"

export default function Detail() {
    return (
        <div className="detail text-center">
            <div className="top p-5">
                <h2>STEPS</h2>
                <ol className="list-group list-group-numbered">
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                    <li className="list-group-item border-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Maecenas ac.
                    </li>
                </ol>
            </div>
            <div className="mid rounded-5">
                <h2>HOW DOES THE ALGORITHM WORKS?</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam quam nulla
                    porttitor. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Malesuada fames
                    ac turpis egestas sed tempus. Consectetur purus ut faucibus pulvinar elementum integer. Sit amet
                    consectetur adipiscing elit duis. Etiam non quam lacus
                    suspendisse. Vitae sapien pellentesque habitant morbi tristique. Mattis rhoncus urna
                    neque viverra justo nec ultrices. Interdum velit euismod in pellentesque massa
                    placerat duis ultricies lacus.</p>
            </div>
            <div className="bot justify-content-center">
                <div className={"row mb-2"}>
                    <h2>RUNNING TIME AND SPACE COMPLEXITY</h2>
                </div>
                <div className={"row mt-2"}>
                    <p className={"text-start align-self-center"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor
                        incididunt ut labore et dolore magna aliqua. Vitae et leo duis ut diam quam nulla
                        porttitor. Sed turpis tincidunt id aliquet risus feugiat in ante metus. Malesuada fames
                        ac turpis egestas sed tempus. Consectetur purus ut faucibus pulvinar elementum
                        integer enim. Sit amet consectetur adipiscing elit duis. Etiam non quam lacus
                        suspendisse. Vitae sapien pellentesque habitant morbi tristique. Mattis rhoncus urna </p>
                </div>
                <div className={"row justify-content-around   align-self-center me-5 ms-5 mt-5 p-sm-auto p-2"}>
                    <div className={"col-auto col-sm-auto align-self-center"}>
                        <h3>FUTURE REFERENCES</h3>
                        <ul>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Lorem ipsum dolor sit amet</li>
                        </ul>
                    </div>
                    <div className={"col-auto  text-center vid"}>
                        <iframe className="rounded-4 m-0" width="auto" height="auto"
                                src="https://www.youtube.com/embed/ovWqEgYYAEQ" title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen={true}/>
                    </div>
                </div>
            </div>
        </div>
    )
}