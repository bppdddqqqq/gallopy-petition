import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../global';
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { SEO } from "../components/seo"

export const pageQuery = graphql`
  query PodepsaliQuery {
		site {
      siteMetadata {
        siteTitle: title
      }
    }
  }
`
const PodepsaliPage = ({ data }) => {
  let [signees, setSignees] = useState([])
	let [pages, setPages] = useState(0)

	const fetchItems = () => {
		fetch(`${SERVER_URL}/fetch/${pages}`).then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.text();
    })
    .then((data) => {
			const array = JSON.parse(data)
			if (data === '[]') {
				setPages(-1)
				return;
			} else {
				setPages(pages + 1)
			}
			for (let i = 0; i < Math.min(array.length, signees.length); i++) {
				// console.log(signees[signees.length-(i+1)], array[0], i)
				if (signees[signees.length-(i+1)].createdAt === array[0].createdAt) {
					setSignees([...signees, ...array.slice(i+1)])
					return;
				}
			}
			setSignees([...signees, ...array])
			// console.log(data, pages)
    });
	}

	useEffect(() => {
    if (signees.length != 0) {
      return;
    }
		fetchItems()
	})
	// console.log(pages)
	return (
		<Layout>
			<div className="mx-auto my-0 mt-8 max-w-6xl">
				<h1>Petici podepsali tito Scalní fanoušci:</h1>
				<p>Tabulka zobrazuje pouze jména osob, které souhlasily se zveřejněním svých osobních údajů, počet respondentů níže se tak nemusí shodovat s celkovým počtem podporovatelů. Počítadlo je aktualizováno každých 15 minut.</p>
				<div className="lg:px-5 lg:pt-5 my-5 lg:shadow-md lg:rounded-lg overflow-y-auto overflow-x-scroll w-full">
				<table>
					<thead>
						<tr>
							<th>Jméno</th>
							<th>Příjmení</th>
							<th>Povolání</th>
							<th>Město</th>
							<th>Podepsáno</th>
						</tr>
					</thead>
					<tbody>
						{
							signees.map(({firstname, lastname, job, city, createdAt}, key) => (
								<tr key={key}>
									<td>{firstname}</td>
									<td>{lastname}</td>
									<td>{job}</td>
									<td>{city}</td>
									<td>{new Date(createdAt + "Z").toLocaleString("cs-CZ", {timeZone: "Europe/Prague"})}</td>
								</tr>
							))
						}
					</tbody>
				</table>
				<div className={"py-3 text-center mt-4 "+((pages === -1) ? "hidden" : "")}>
						<button className="mx-auto" onClick={fetchItems}>
							Načíst další
						</button>
				</div>
				</div>
			</div>
		</Layout>
	)
}

export const Head = () => (
  <SEO />
)

export default PodepsaliPage
