import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../global';
import { graphql } from "gatsby"

import Layout from "../components/layout"
import { SEO } from "../components/seo"

import { normalizeName, normalizeWhiteSpaces } from 'normalize-text';

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
    }).catch(() => {
			setSignees([]);
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
		<Layout className="">
			<div className="mx-auto my-0 mt-8 max-w-6xl container">
				<h1>Petici podepsali tito Scalní fanoušci:</h1>
				<p>Tabulka zobrazuje pouze jména osob, které souhlasily se zveřejněním svých osobních údajů, počet respondentů níže se tak nemusí shodovat s celkovým počtem podporovatelů. Počítadlo je aktualizováno každých 15 minut.</p>
			</div>
			<div className="mx-auto my-0 mt-8 max-8xl relative">
			<div className="my-5 overflow-y-auto overflow-x-scroll w-full max-w-7xl mx-auto lg:px-2 max-lg:pb-16">
				<table className="max-lg:mb-4">
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
									<td>{normalizeName(firstname)}</td>
									<td>{normalizeName(lastname)}</td>
									<td>{normalizeWhiteSpaces(job)}</td>
									<td>{normalizeName(city)}</td>
									<td>{new Date(createdAt + "Z").toLocaleString("cs-CZ", {timeZone: "Europe/Prague"})}</td>
								</tr>
							))
						}
					</tbody>
				</table>
				<div className={"py-3 text-center mt-4 max-lg:absolute max-lg:bottom-0 max-lg:right-0 max-lg:left-0 max-lg:left:4 "+((pages === -1) ? "hidden" : "")}>
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
