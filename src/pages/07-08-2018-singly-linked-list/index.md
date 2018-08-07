---
path: '/singly-linked-list'
title: 'Linked list from scratch'
image: '../../images/new-soon.png'
date: '2018-08-07'
type: 'cs'
published: true 
----------------------------------------------------------

A linked list is a list of nodes, where each node stores some kind of arbitrary data, furthermore every note has a reference to the next node, hence the name **linked list**.  
A linked list can be used to construct other simple data structures such as lists(arrays),stacks and queues. One of the benefits of using a linked list instead of an array is that we can easily insert and remove elements in the liked list without having the need to restructure the whole list like we would have to do if we used an array.  
But don't get confused, linked list isn't only made of rainbow dust and has only some downsides regarding runningtime.

| Average 	|        	|           	|         	| Worst  	|        	|           	|          	|
|---------	|--------	|-----------	|---------	|--------	|--------	|-----------	|----------	|
| Access  	| Search 	| Insertion 	| Deletion 	| Access 	| Search 	| Insertion 	| Deletion 	|
| $O(n)$  	| $O(n)$ 	| $O(1)$    	| $O(1)$  	| $O(n)$ 	| $O(n)$ 	| $O(1)$    	| $O(1)$   	|
